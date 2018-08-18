<template>
  <path :class="computedClass"></path>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import Dimensions from "../mixins/Dimensions";
import Transition from "../animation/Transition";
import Scale from "../drawing/Scale";

export default {
  name: 'LinePath',
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
      computedClass: function() {
        let className = `c-chart__line c-chart__line--${this.model.id}`;

        return className;
      },
  },
  methods: {

    setModel() {
        this.model = this.chart;
        this.chartId = this.chartId;
    },
  
    createLine() {

        const path = `.c-chart__line--${this.model.id}`;

        d3.select(path)
            .datum(this.model.dataset)
            .attr(Consts.D, this.applyPath())
            .call(Transition);
    },

    applyPath() {
        const xKey = this.model.xKey;
        const yKey = this.model.yKey;

        const xScale = this.Scale.createXScale(this.getLineModel());
        const yScale = this.Scale.createYScale(this.getLineModel());

        let line =  d3.line()
                    .x(function (d) {
                        return xScale(d[xKey]); 
                    })
                    .y(function (d) { 
                        return yScale(d[yKey]); 
                    });

        line = this.addCurve(line);

        return line;
    },

    addCurve(line) {
  
        if(this.model.config.hasOwnProperty("curve") && this.model.config.curve === true) {
            return line.curve(d3.curveMonotoneX);
        }

        return line;
    },

    getLineHeight() {
        return this.height - this.model.margin.top - this.model.margin.bottom;
    },

    getLineWidth() {
        return this.width - this.model.margin.left - this.model.margin.right;
    },

 
    getLineModel() {

        const temp = Object.assign(this.chart, {
            width: this.width,
            height: this.height
        })

        return temp;
    },

    resize() {
       window.addEventListener('resize', () => {
          
           this.createLine();

      });

    }
  },
  mounted() {

    this.setModel();

  },
  updated() { 
    this.Scale = new Scale(this.model);
    this.createLine();

  }
}
</script>

<style>


</style>
