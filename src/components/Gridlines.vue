<template>
  <g :class="computedClass"></g>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import { lineScale } from "../utilities/LineScale";

export default {
  name: 'Gridlines',
  props: {
    chartData: Object,
    w: Number,
    h: Number,
    xScale: Function,
    yScale: Function,
  },
  data: function() {
    return {
      chart: this.chartData,
      width: this.w,
      height: this.h,
      scales: "",
      left: 40
    }
  },
  computed: {
      computedClass() {
        return `c-chart__gridlines c-chart__gridlines--${this.chart.id}`;
      },
  },
  methods: {
  
    addMultiGridLines(multi = true) {
  
        if(multi === true) {
            this.addXGridLine();
            this.addYGridLine();
        }

        if(multi === Consts.X) this.addXGridLine();
        if(multi === Consts.Y) this.addYGridLine();

    },

    create(type) {
        const parentCls = `.c-chart__gridlines--${this.chart.id}`;
        const className = `c-chart__gridlines-${type} c-chart__gridlines-${type}--${this.chart.id}`;

        d3.select(parentCls).append(Consts.G)
            .attr(Consts.CLASS, className);
    },
   

    addXGridLine() {

        this.create(Consts.X);
  
        const className = `c-chart__gridlines-x--${this.chart.id}`;

        d3.selectAll(`.${className}`)
            .attr("transform", `translate(0, ${this.height})`)
            .call(d3.axisBottom(this.scales.xScale)
                    .tickSize(-this.height)
                    .tickFormat(""));
    },
 
    addYGridLine() {

        this.create(Consts.Y);

        const className = `c-chart__gridlines-y--${this.chart.id}`;

        d3.selectAll(`.${className}`)
            .call(d3.axisLeft(this.scales.yScale)
                    .tickSize(-this.width)
                    .tickFormat(""));
    },
  },
  mounted() {

    this.scales = lineScale(this.chart, this.width, this.height);

    if(this.chart.settings.hasOwnProperty("gridlines")) {
        this.addMultiGridLines(this.chart.settings.gridlines);
    }

  }
}
</script>