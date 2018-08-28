<template>
    <g :class="computedGClass">
        <path :class="computedClass"></path>
        <path :class="computedAreaClass"></path>
        <Dots :chartData="chart" :w="w" :h="h" />
    </g>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import Transition from "../animation/Transition";
import { lineScale } from "../utilities/LineScale";
import Dots from "./Dots";

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
      height: this.h,
      gradient: this.chartData.settings.gradient
    }
  },
  computed: {
    computedClass: function() {
        return `c-chart__line c-chart__line--${this.chart.id}`;
    },
    computedGClass: function() {
        return `c-chart__linedots c-chart__linedots--${this.chart.id}`;
    },
    computedAreaClass: function() {
        return `c-chart__area c-chart__area--${this.chart.id}`;
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

    addCurve(element) {
    
            if(this.chart.settings.hasOwnProperty("curve") && this.chart.settings.curve === true) {
                return element.curve(d3.curveMonotoneX);
            }

            return element;
    },
        computeArea() {

            const xKey = this.chart.axis.x;
            const yKey = this.chart.axis.y;
            const xScale = this.scales.xScale;
            const yScale = this.scales.yScale;
        
            let area = d3.area()
                        .x(function (d) {
                            return xScale(d[xKey]); 
                        })
                        .y0(yScale(0))
                        .y1(function (d) { 
                            return yScale(d[yKey]); 
                        });

            area = this.addCurve(area);

            return area;
        },
        addArea() {

            const areaCls = `.c-chart__area--${this.chart.id}`;

            d3.select(areaCls)
                .datum(this.chart.parsedData)
                .attr(Consts.D, this.computeArea())
                .call(Transition);
        }
    },
    mounted() {
        this.scales = lineScale(this.chart, this.width, this.height);
        this.createLine();

        if(this.gradient === true) {
            this.addArea();
        }

    },
}
</script>

<style>
.c-chart__area--1 {
    fill: #ffab00;
}

</style>
