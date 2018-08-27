<template>
    <g :class="computedGClass">
    </g>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
//import { lineScale } from "../utilities/BarScale";

export default {
    name: 'Bar',
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
    
        createBar() {

        
        },

    },
    mounted() {
        this.scales = lineScale(this.chart, this.width, this.height);
        this.createBar();

    },
}
</script>

<style>


</style>
