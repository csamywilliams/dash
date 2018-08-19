<template>
  <text :class="computedClass"></text>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import Dimensions from "../mixins/Dimensions";
import Scale from "../drawing/Scale";
import Transform from "../drawing/Transform";

export default {
  name: 'AxisText',
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
    }
  },
  computed: {
      computedClass: function() {
        let className = `c-chart__axistext c-chart__axistext-${this.axis}--${this.model.id}`;

        return className;
      },
  },
  methods: {

    setModel: function() {
        this.model = this.chart;
        this.chartId = this.chartId;
    },

    createAxisText: function() {

        if(this.axis === Consts.X) {
            this.drawX();
        } else if (this.axis === Consts.Y) {
            this.drawY();
        }
    },
  
    drawX() {

        const w = this.width / 2;
        const h = this.height + this.chart.margin.bottom - 10;

        const translate = new Transform().translate((this.chart.width / 2), (this.chart.height + this.chart.margin.bottom + 20));
       
        d3.select(`.c-chart__axistext-${this.axis}--${this.model.id}`)
            .attr("transform", `translate(${w}, ${h})`)
            .style("text-anchor", "middle")
            .text(this.chart.labelX);
    },

    drawY() {

        d3.select(`.c-chart__axistext-${this.axis}--${this.model.id}`)
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - this.chart.margin.right)
            .attr("x", 0 - (this.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(this.chart.labelY);
    },

    resize: function() {
       window.addEventListener('resize', () => {
          
        

        })
    },
  },
  mounted: function() {
    this.setModel();
  },
  updated: function() { 
    this.createAxisText();
  }
}
</script>
