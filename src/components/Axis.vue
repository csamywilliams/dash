<template>
  <g :class="computedClass"></g>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import { parseTime } from "../utilities/Utilities";
import Axis from "../drawing/Axis";

export default {
  name: 'Axis',
  props: {
    axisModel: Object,
    axis: {
        type: String,
        required: true
    }
  },
  data: function() {
    return {
      model: {}
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
        this.model = this.axisModel;
    },
  
    createAxis: function() {

        if(this.axis === Consts.X) {
            this.createXAxis();
        } else if (this.axis === Consts.Y) {

        }
    },

    createXAxis: function() {
        debugger;

        const xScale = this.model.xScale;
        const height = this.getChartHeight();

        d3.select(`.c-chart__axis-${this.axis}--${this.model.id}`)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)
                    .tickFormat(d3.timeFormat(Consts.DATE_DMY)));
    },

    getChartDimensions: function() {
        const cls = `c-chart__svg--${this.model.id}`;

        return document.getElementsByClassName(cls)[0].getBBox();
    },

    getChartHeight: function() {
        const h = this.getChartDimensions().height;
        debugger;
        return h;
    },

    getChartWidth: function() {
        return this.getChartDimensions().width;
    },

    resize: function() {
       window.addEventListener('resize', () => {
          
          // let tempChart = this.chart;  
          // let resizeChart = lineChart.resize();
          // tempChart = Object.assign(tempChart, resizeChart); //update obj with new h/w

          // let tempScale = scale.resize(tempChart);  //update the xScale/yScale
          // tempChart = Object.assign(tempChart, tempScale);

          // line.resize(tempChart);
          // axis.resize(tempChart);
          // axisText.resize(tempChart);
          // gridlines.addMultiGridLines(tempChart.config.gridline);
          // dots.resize(tempChart);

      });

    }
  },
  mounted: function() { 

    const model = this.model;
    this.setModel();


    this.createAxis();
  }
}
</script>

<style>


</style>
