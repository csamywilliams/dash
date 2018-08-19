<template>
  <g :class="computedClass"></g>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import Dimensions from "../mixins/Dimensions";
import Scale from "../drawing/Scale";

export default {
  name: 'Gridlines',
  mixins: [Dimensions],
  props: {
    chart: Object,
    chartId: {
        type: Number,
        required: true
    }
  },
  data: function() {
    return {
      model: {},
      Scale: "",
    }
  },
  computed: {
      computedClass() {
        return `c-chart__gridlines c-chart__gridlines--${this.model.id}`;
      },
  },
  methods: {

    setModel() {
        this.model = this.chart;
        this.chartId = this.chartId;
    },
  
    addMultiGridLines(multi = true) {
     
        if(multi === true) {
            this.addXGridLine();
            this.addYGridLine();
        }

        if(multi === Consts.X) this.addXGridLine();
        if(multi === Consts.Y) this.addYGridLine();

    },

    create(type) {
        const parentCls = `.c-chart__gridlines--${this.model.id}`;
        const className = `c-chart__gridlines c-chart__gridlines-${type}--${this.model.id}`;

        d3.select(parentCls).append(Consts.G)
            .attr(Consts.CLASS, className);
    },
   

    addXGridLine() {

        this.create(Consts.X);

        const className = `c-chart__gridlines-x--${this.model.id}`;

        this.xScale = this.Scale.createXScale(this.getAxisModel());

        d3.selectAll(`.${className}`)
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.xScale)
                    .tickSize(-this.height)
                    .tickFormat(""));
    },
 
    addYGridLine() {

        this.create(Consts.Y);

        const className = `c-chart__gridlines-y--${this.model.id}`;

        this.yScale = this.Scale.createYScale(this.getAxisModel());

        d3.selectAll(`.${className}`)
            .call(d3.axisLeft(this.yScale)
                    .tickSize(-this.width)
                    .tickFormat(""));
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

  },
  updated() { 
    this.Scale = new Scale(this.model);

    if(this.chart.config.hasOwnProperty("gridline")) {
        this.addMultiGridLines(this.chart.config.gridline);
    }

  }
}
</script>

<style>


</style>
