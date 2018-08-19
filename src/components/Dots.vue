<template>
  <circle :class="computedClass"></circle>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import Dimensions from "../mixins/Dimensions";
import Transition from "../animation/Transition";
import Scale from "../drawing/Scale";
import Tooltip from "../animation/Tooltip";

export default {
  name: 'Dots',
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
      dots: {}
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
  
    createDots() {

        const clsName = `c-chart__dots--${this.model.id}`;
        const parentCls = `.c-chart__linedots--${this.model.id}`;

        const xScale = this.Scale.createXScale(this.getModel());
        const yScale = this.Scale.createYScale(this.getModel());

        const chart = this.chart;

        let dots = d3.select(parentCls).selectAll(`.${clsName}`)
                .data(chart.dataset)
                .enter()
                .append(Consts.CIRCLE)
                .attr(Consts.CLASS, clsName)
                .attr(Consts.CX, function(d) {
                    return xScale(d[chart.xKey]) 
                })
                .attr(Consts.CY, function(d) { 
                    return yScale(d[chart.yKey]) 
                })
                .attr(Consts.R, this.circleRadius());

        if(this.chart.config.tooltips) {
            dots = new Tooltip(this.chart).draw(dots);
        }

    },

    circleRadius(obj) {

        if(this.chart.config.hasOwnProperty("radius")) {
            return this.chart.config.radius;
        }

        return Consts.DOT_RADIUS;
    },

    getModel() {

        const temp = Object.assign(this.chart, {
            width: this.width,
            height: this.height
        })

        return temp;
    },

    resize() {
       window.addEventListener('resize', () => {
          
      });

    }
  },
  mounted() {

    this.setModel();

  },
  updated() { 
    this.Scale = new Scale(this.model);
    this.createDots();

  }
}
</script>

<style>


</style>
