<template>
  <div :class="computedClass">
    <svg :class="computedSVGClass" :width="computeWidth" :height="computeHeight" preserveAspectRatio="xMinYMin meet" :viewBox="computeViewBox">
      <g :class="computedGClass" :transform="computeTransform" ></g>
    </svg> 
  </div>
</template>

<script>

import Consts from "../constants/Consts";
import * as d3 from "d3";

export default {
    name: 'BarChart',
    props: {
        chartData: {
          type: Object,
          required: true
        },
        id: {
          type: Number,
          required: true
        }
    },
    data: function() {
        return {
            chart: this.chartData,
            svg: {},
            g: {},
            w: 800,
            h: 400,
            margin: {
              top: 20, 
              right: 60, 
              bottom: 80, 
              left: 80
            },
            x: d3.scaleBand().padding(0.1),
            y: d3.scaleLinear(),
        }
    },
  computed: {
    computedClass() {
        return `c-chart__container c-chart__container--${this.chartData.id}`;
    },
    computedSVGClass() {
        return `c-chart__svg c-chart__svg--${this.chartData.id}`;
    },
    computedGClass() {
        return `c-chart__g c-chart__g--${this.chartData.id}`;
    },
    computeViewBox() {
      return `0 0 ${this.w} ${this.h}`;
    },
    computeWidth() {
      return this.w;
    },
    computeHeight() {
      return this.h;
    },
    computeTransform() {
      return `translate(${this.margin.left}, ${this.margin.top})`;
    }
  },
  methods: {
    createChart() {
      this.svg = d3.select(`.c-chart__svg--${this.chartData.id}`);
      this.g = d3.select(`.c-chart__g--${this.chartData.id}`);
    },
    draw() {

      const width = this.w - this.margin.left - this.margin.right;
      const height = this.h - this.margin.top - this.margin.bottom;

      this.x.rangeRound([0, width]);
      this.y.rangeRound([height, 0]);

      this.g.select( `.c-chart__axis c-chart__axis-x c-chart__axis-x--${this.chart.id}`)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.x));

      this.g.select(`.c-chart__axis c-chart__axis-y c-chart__axis-x--${this.chart.id}`)
            .call(d3.axisLeft(this.y).ticks(10, "%"));

      this.addBars(height);
    },
    addBars(h) {

      const rectCls = `c-chart__rect c-chart__rect--${this.chartData.id}`;
      const barCls = `c-chart__bar c-chart__bar--${this.chartData.id}`;
      const x = this.x;
      const y = this.y;
      const xKey = this.chart.axis.x;
      const yKey = this.chart.axis.y;
      const t = d3.transition()
                  .duration(750);
  
      let bars = this.g.selectAll(`.${barCls}`)
                    .data(this.chart.data);

      bars
        .enter().append(Consts.RECT)
        .transition(t)
        .attr(Consts.CLASS, function(d, id) {
          return `${rectCls} c-chart__bar--${id}`
        })
        .attr(Consts.X, function (d) { return x(d[xKey]); })
        .attr(Consts.Y, function (d) { return y(d[yKey]); })
        .attr(Consts.WIDTH, x.bandwidth())
        .attr(Consts.HEIGHT, function (d) { return h - y(d[yKey]); });

      bars.exit()
        .remove();

      this.addAxis();
    },
    addAxis() {
        const x = this.x;
        const y = this.y;

        this.g.append(Consts.G)
          .call(d3.axisLeft(y));

        const innerHeight = this.h - this.margin.bottom - this.margin.top;

        this.g.append(Consts.G)
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(x));
    },
  },
  mounted() {
      this.createChart();
      const x = this.chart.axis.x;
      const y = this.chart.axis.y;

      this.x.domain(this.chart.data.map(function (d) { return d[x]; }));
      this.y.domain([0, d3.max(this.chart.data, function (d) { return d[y]; })]);

      this.draw();

  },
}
</script>

<style>

.c-chart__bar--0 {
  fill: #C70039;
}

.c-chart__bar--1 {
  fill: #571845;
}

.c-chart__bar--2 {
  fill: #FFC300;
}

</style>
