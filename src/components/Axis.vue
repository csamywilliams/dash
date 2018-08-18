<template>
  <g :class="computedClass"></g>
</template>

<script>

import * as d3 from "d3";
import Vue from 'vue';
import Consts from "../constants/Consts";
import { parseTime } from "../utilities/Utilities";
import Dimensions from "../mixins/Dimensions";
import Scale from "../drawing/Scale";

import { UPDATE_LINECHART } from 'vuex';

export default {
  name: 'Axis',
  mixins: [Dimensions],
  props: {
    chart: Object,
    axis: {
        type: String,
        required: true
    },
    chartId: {
        type: Number,
        required: true
    }
  },
  data: function() {
    return {
      model: {},
      axisModel: {},
      xScale: "",
      yScale: "",
      Scale: "",
    }
  },
  computed: {
      computedClass: function() {
        let className = `c-chart__axis c-chart__axis-${this.axis}--${this.model.id}`;

        return className;
      },
  },
  methods: {

    setModel: function() {
        this.model = this.chart;
        this.chartId = this.chartId;
    },
  
    createAxis: function() {

        if(this.axis === Consts.X) {
            this.createXAxis();
        } else if (this.axis === Consts.Y) {
            this.createYAxis();
        }
    },

    createXAxis() {

        this.xScale = this.Scale.createXScale(this.getAxisModel());

        const height = this.height;

        const scaleG = `.c-chart__axis-${this.axis}--${this.model.id}`;

        d3.select(scaleG)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.xScale)
            .tickFormat(d3.timeFormat(Consts.DATE_DMY)));
    },

    createYAxis() {
        this.yScale = this.Scale.createYScale(this.getAxisModel());

        const scaleG = `.c-chart__axis-${this.axis}--${this.model.id}`;

        d3.select(scaleG)
            .call(d3.axisLeft(this.yScale));
    },

    getAxisModel() {

        const temp = Object.assign(this.chart, {
            width: this.width,
            height: this.height
        })

        return temp;
    },

    resize: function() {
       window.addEventListener('resize', () => {
          
          this.xScale.range([0, this.width - this.model.margin.left]);
          this.yScale.range([this.height, 0]);

        })
    },
  },
  mounted: function() {
    this.setModel();
    this.Scale = new Scale(this.chart);
  },
  updated: function() { 
    
    this.createAxis();

  }
}
</script>

<style>


</style>
