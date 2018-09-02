<template>
  <div :class="computedClass"></div>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";

export default {
    name: 'ChartLegend',
    props: {
        chartData: Object,
        w: Number,
        h: Number
    },
    data: function() {
        return {
            chart: this.chartData,
            width: this.w,
            height: this.h
        }
    },
    computed: {
        computedClass() {
            return `c-chart__legend c-chart__legend--${this.chart.id}`;
        },
    },
    methods: {

    },
    mounted() {

    },
}
</script>

<style>


</style>
