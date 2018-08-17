<template>
  <g :class="computedClass"></g>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import { parseTime } from "../utilities/Utilities";
import Axis from "../drawing/Axis";

import Dimensions from "../mixins/Dimensions";

export default {
  name: 'Axis',
  mixins: [Dimensions],
  props: {
    axisModel: Object,
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
      xScale: {},
      yScale: {}
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
        this.chartId = this.chartId;
    },
  
    createAxis: function() {

        if(this.axis === Consts.X) {
            this.createXAxis();
        } else if (this.axis === Consts.Y) {
            this.createYAxis();
        }
    },

    createXScale(key) {
        const parser = parseTime(Consts.DATE_DMY);

        const minRange = this.getMinScale(key, parser);
        const maxRange = this.getMaxScale(key, parser);

        return d3.scaleTime()
            .domain([minRange, maxRange])
            .range([0, this.getAxisWidth()]);
    },

    createYScale(key) {
         var yDomain = d3.max(this.model.data, function (d) { 
            return d[key]; 
        })

        return d3.scaleLinear()
            .domain([0, yDomain])
            .range([this.getAxisHeight(), 0]);
    },

    createXAxis() {

        this.xScale = this.createXScale(this.model.xKey);
        const height = this.getAxisHeight();

        const scaleG = `.c-chart__axis-${this.axis}--${this.model.id}`;

        d3.select(scaleG)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(this.xScale)
            .tickFormat(d3.timeFormat(Consts.DATE_DMY)));
    },

    createYAxis() {
        this.yScale = this.createYScale(this.model.yKey);

        const scaleG = `.c-chart__axis-${this.axis}--${this.model.id}`;

        d3.select(scaleG)
            .call(d3.axisLeft(this.yScale));
    },

    getMaxScale(target, parser) {
        return d3.max(this.model.data, function (d) { 
            return parser(d[target]); 
        });
    },

    getMinScale(target, parser) {
        return d3.min(this.model.data, function (d) { 
            return parser(d[target]); 
        });
    },

    getAxisHeight() {
        return this.height - this.model.margin.top - this.model.margin.bottom;
    },

    getAxisWidth() {
        return this.width - this.model.margin.left - this.model.margin.right;
    },

    resize: function() {
       window.addEventListener('resize', () => {
          
          this.xScale.range([0, this.width - this.model.margin.left]);
          this.yScale.range([this.height, 0]);

      });

    }
  },
  mounted: function() {
    
    this.setModel();

  },
  updated: function() { 

    this.createAxis();
    
  }
}
</script>

<style>


</style>
