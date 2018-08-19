<template>
  <g :class="computedClass"></g>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import Dimensions from "../mixins/Dimensions";
import Scale from "../drawing/Scale";

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
      computedClass() {
        return `c-chart__axis c-chart__axis-${this.axis}--${this.model.id}`;
      },
  },
  methods: {

    setModel() {
        this.model = this.chart;
        this.chartId = this.chartId;
    },
  
    createAxis() {

        if(this.axis === Consts.X) {
            this.createXAxis();
        } else if (this.axis === Consts.Y) {
            this.createYAxis();
        }
    },

    createXAxis() {

        this.xScale = this.Scale.createXScale(this.getAxisModel());

        this.updateXAxis(this.xScale);
    },

    createYAxis() {
        this.yScale = this.Scale.createYScale(this.getAxisModel());

        this.updateYAxis(this.yScale);
    },

    updateXAxis(xScale) {
        
        const scaleG = `.c-chart__axis-${this.axis}--${this.model.id}`;

        d3.select(scaleG)
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(xScale)
            .tickFormat(d3.timeFormat(Consts.DATE_DMY)));

    },

    updateYAxis(yScale) {
        
        const scaleG = `.c-chart__axis-${this.axis}--${this.model.id}`;

        d3.select(scaleG)
            .call(d3.axisLeft(yScale));

    },

    getAxisModel() {

        const temp = Object.assign(this.chart, {
            width: this.width,
            height: this.height
        })

        return temp;
    },
  },
  mounted() {
    this.setModel();
    this.Scale = new Scale(this.chart);
  },
  updated() { 
    
    this.createAxis();

  }
}
</script>
