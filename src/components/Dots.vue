<template>
  <circle :class="computedClass"></circle>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import Tooltip from "../animation/Tooltip";
import { lineScale } from "../utilities/LineScale";

export default {
    name: 'dots',
    props: {
        chartData: Object,
        w: Number,
        h: Number
    },
    data: function() {
        return {
            chart: this.chartData,
            scales: "",
            dots: {},
            width: this.w,
            height: this.h
        }
    },
    computed: {
        computedClass() {
            return `c-chart__dots c-chart__dots--${this.chart.id}`;
        },
    },
    methods: {

        createDots() {

            const clsName = `c-chart__dots--${this.chart.id}`;
            const parentCls = `.c-chart__linedots--${this.chart.id}`;


            const chartId = this.chart.id;
            const xKey = this.chart.axis.x;
            const yKey = this.chart.axis.y;
            const xScale = this.scales.xScale;
            const yScale = this.scales.yScale;
            const dataset = this.chart.parsedData;

            let dots = d3.select(parentCls)
                    .selectAll(`.${clsName}`)
                    .data(dataset)
                    .enter()
                    .append(Consts.CIRCLE)
                    .attr(Consts.CLASS, function(k, id) {
                        return `c-chart__dots--${chartId} c-chart__dots-${chartId}--c${id}`;
                    });

            dots.attr(Consts.CX, function(d) {
                        return xScale(d[xKey]) 
                    })
                    .attr(Consts.CY, function(d) { 
                        return yScale(d[yKey]) 
                    })
                    .attr(Consts.R, this.circleRadius());

            if(this.chart.settings.tooltips) {
                dots = new Tooltip(this.chart).draw(dots);
            }

        },

        circleRadius() {

            if(this.chart.settings.hasOwnProperty("radius")) {
                return this.chart.settings.radius;
            }

            return Consts.DOT_RADIUS;
        },

    },
    mounted() {
        this.scales = lineScale(this.chart, this.width, this.height);
        this.createDots();
    },
}
</script>

<style>


</style>
