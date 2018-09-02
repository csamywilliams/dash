<template>
  <text :class="computedClass"></text>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";

export default {
    name: 'AxisText',
    props: {
        chartData: Object,
        axis: {
            type: String,
            required: true
        },
        w: Number,
        h: Number,
    },
    data: function() {
        return {
            chart: this.chartData,
            width: this.w,
            height: this.h,
            margin: {
                top: 20, 
                right: 60, 
                bottom: 50, 
                left: 80
            },
        }
    },
    computed: {
        computedClass: function() {
            return `c-chart__axistext c-chart__axistext-${this.axis}--${this.chart.id}`;
        },
    },
    methods: {

        createAxisText: function() {
            if(this.axis === Consts.X) {
                this.drawX();
            } else if (this.axis === Consts.Y) {
                this.drawY();
            }
        },
  
        drawX() {

            const w = this.width / 2;
            const h = this.height + this.margin.bottom - 10;

            d3.select(`.c-chart__axistext-${this.axis}--${this.chart.id}`)
                .attr("transform", `translate(${w}, ${h})`)
                .style("text-anchor", "middle")
                .text(this.chart.axis.labelX);
        },

        drawY() {

            d3.select(`.c-chart__axistext-${this.axis}--${this.chart.id}`)
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - this.margin.right)
                .attr("x", 0 - (this.height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text(this.chart.axis.labelY);
        },
    },
    mounted() {
        this.createAxisText();
    },
}
</script>
