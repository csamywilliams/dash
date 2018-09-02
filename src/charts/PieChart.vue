<template>
    <div :class="computedClass">
    <svg :class="computedSVGClass" :width="computeWidth" :height="computeHeight" preserveAspectRatio="xMinYMin meet" :viewBox="computeViewBox">
      <g :class="computedGClass" :transform="computeTransform"></g>
    </svg> 
  </div>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import Legend from "../drawing/Legend";

export default {
    name: 'PieChart',
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
            w: 400,
            h: 400,
            margin: { 
                top: 20,
                right: 20,
                bottom: 30,
                left: 40
            },
            g: {},
            radius: function() {
              return Math.min(this.w, this.h) / 2;
            },
        }
    },
    computed: {
        computedClass() {
            return `c-chart__container c-chart__container--${this.id}`;
        },
        computedSVGClass() {
            return `c-chart__svg c-chart__svg--${this.id}`;
        },
        computedGClass() {
            return `c-chart__g c-chart__g--${this.id}`;
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
            const width = this.w / 2;
            const height = this.h / 2;
            return `translate(${width}, ${height})`;
        }
    },
    methods: {

        createChart: function() {

          const cls = `c-chart__arc c-chart__arc--${this.id} c-chart__slice c-chart__slice`;
          
          const pieAmount = this.chart.axis.amount;

          const pie = d3.pie()
                          .sort(null)
                          .value(function (d) { 
                              return d[pieAmount]
                          });

          this.g = d3.select(`.c-chart__g--${this.id}`)
              .selectAll(`.${cls}`)
              .data(pie(this.chart.data))
              .enter().append(Consts.G)
              .attr(Consts.CLASS, function(d) { 
                return `${cls}--${d.index}`;
              }); 

          this.createPath();
          this.createText();
        
    },

    createPath() {
   
        const arc = d3.arc()
              .outerRadius(this.radius() - 10)
              .innerRadius(0);

  
        const cls = `c-chart__arc-path--${this.id}`;

        this.g.append(Consts.PATH)
          .attr(Consts.D, arc)
          .attr(Consts.CLASS, function(d) { 
              return `c-chart__arc-path ${cls} c-chart__pie-path c-chart__pie-path--${d.index}`;
          })
          .transition()
          .delay(function(d, i) { return i * 500; })
          .duration(500)
          .attrTween('d', function(d) {
                var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                return function(t) {
                  d.endAngle = i(t);
                  return arc(d);
                };
            });
    },
    createText() {

        const labelArc = d3.arc()
                        .outerRadius(this.radius() - 30)
                        .innerRadius(this.radius() - 175);
                        
        const cls = `c-chart__arc-text--${this.id}`;

        this.g.append(Consts.TEXT)
            .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .attr(Consts.CLASS, function(d) { 
                return `c-chart__arc-text ${cls} ${cls}--${d.index}`;
            })
            .text(function(d) { return d.data.type; });
      }
    },
    mounted() {
      this.createChart();
    }
}
</script>

<style>


.c-chart__arc-text {
    fill: black;
    font: 12px sans-serif;
    text-anchor: middle;
}

.c-pie__path {
  stroke: #fff;
}

.legend {
     background-color: #F1F3F3;
     padding: 5px;
}

.legend-text {
    font-size: 12px;
}



</style>
