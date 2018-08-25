<template>
  <g :class="computedClass"></g>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import Dimensions from "../mixins/Dimensions";
import Scale from "../drawing/Scale";
import { lineScale } from "../utilities/LineScale";

export default {
  name: 'Axis',
  props: {
    chartData: Object,
    axis: {
        type: String,
        required: true
    },
    w: Number,
    h: Number
  },
  data: function() {
    return {
      chart: this.chartData,
      scales: "",
      width: this.w,
      height: this.h,
      left: 40,
    }
  },
  computed: {
      computedClass() {
        return `c-chart__axis c-chart__axis-${this.axis}--${this.chart.id}`;
      },
  },
  methods: {

    createAxis() {

        if(this.axis === Consts.X) {
            this.xAxis(this.scales.xScale);
        } else if (this.axis === Consts.Y) {
            this.yAxis(this.scales.yScale);
        }
    },

    xAxis(xScale) {
        
        const scaleG = `.c-chart__axis-${this.axis}--${this.chart.id}`;

        d3.select(scaleG)
            .attr("transform", `translate(0, ${this.h})`)
            .call(d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat(Consts.DATE_DMY)));

    },

    yAxis(yScale) {
        
        const scaleG = `.c-chart__axis-${this.axis}--${this.chart.id}`;

        d3.select(scaleG)
            .call(d3.axisLeft(yScale));

    },
  },
  mounted() {
      this.scales = lineScale(this.chart, this.width, this.height);
      this.createAxis();
  },
  updated() { 
    
    this.createAxis();

  }
}
</script>
