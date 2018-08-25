<template>
    <g :class="computedGClass">
        <path :class="computedClass"></path>
        <!-- <Dots :chartData="chart" :w="w" :h="h" /> -->
    </g>
</template>

<script>

import Dots from "./Dots";

import * as d3 from "d3";
import Consts from "../constants/Consts";
import Transition from "../animation/Transition";
import Scale from "../drawing/Scale";
import { lineScale } from "../utilities/LineScale";

export default {
  name: 'LinePath',
  components: { Dots },
  props: {
    chartData: Object,
    w: Number,
    h: Number
  },
  data: function() {
    return {
      chart: this.chartData,
      scales: "",
      width: this.w,
      height: this.h
    }
  },
  computed: {
    computedClass: function() {
        return `c-chart__line c-chart__line--${this.chart.id}`;
    },
    computedGClass: function() {
        return `c-chart__linedots c-chart__linedots--${this.chart.id}`;
    },
  },
  methods: {
  
    createLine() {

        const path = `.c-chart__line--${this.chart.id}`;

        d3.select(path)
            .datum(this.chart.parsedData)
            .attr(Consts.D, this.applyPath())
            .call(Transition);
    },

    applyPath() {
        const xKey = this.chart.axis.x;
        const yKey = this.chart.axis.y;

        const xScale = this.scales.xScale;
        const yScale = this.scales.yScale;

        let line = d3.line()
                    .x(function (d) {
                        return xScale(d[xKey]); 
                    })
                    .y(function (d) { 
                        return yScale(d[yKey]); 
                    });

        line = this.addCurve(line);

        return line;
    },

    addCurve(line) {
    
            if(this.chart.settings.hasOwnProperty("curve") && this.chart.settings.curve === true) {
                return line.curve(d3.curveMonotoneX);
            }

            return line;
        },
        
    },
    mounted() {
            this.scales = lineScale(this.chart, this.width, this.height);
            this.createLine();

    },
}
</script>

<style>


</style>
