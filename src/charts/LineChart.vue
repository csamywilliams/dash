<template>
  <div :class="computedClass">
    <svg :class="computedSVGClass" :width="computeWidth" :height="computeHeight" preserveAspectRatio="xMinYMin meet" :viewBox="computeViewBox">
      <g :class="computedGClass" :transform="computeTransform" >
        <Gridlines :chartData="chart" :w="computeInnerWidth" :h="computeInnerHeight"/>
        <Axis :chartData="chart" axis="x" :w="computeInnerWidth" :h="computeInnerHeight"/>
        <Axis :chartData="chart" axis="y" :w="computeInnerWidth" :h="computeInnerHeight"/> 
        <LinePath :chartData="chart" :w="computeInnerWidth" :h="computeInnerHeight"/>
        <AxisText :chartData="chart" axis="x" :w="computeInnerWidth" :h="computeInnerHeight" />
        <AxisText :chartData="chart" axis="y" :w="computeInnerWidth" :h="computeInnerHeight" />
      </g>
    </svg> 
  </div>
</template>

<script>

import Axis from "../components/Axis";
import AxisText from "../text/AxisText";
import Consts from "../constants/Consts";
import Gridlines from "../components/Gridlines";
import LinePath from "../components/LinePath";
import { parseTime } from "../utilities/Utilities";

export default {
  name: 'LineChart',
  props: {
    chartData: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  components: {
    Axis,
    AxisText,
    LinePath,
    Gridlines,
  },
  data: function() {
    return {
      chart: this.chartData,
      parsedData: [],
      svg: {},
      w: 800,
      h: 400,
      margin: {
        top: 20, 
        right: 60, 
        bottom: 50, 
        left: 80
      }
    }
  },
  computed: {
    computedClass() {
        return `c-chart__container c-chart__container--${this.id}`;
    },
    computedSVGClass() {
        return `c-chart__svg c-chart__svg--${this.id}`;
    },
    computedGClass() {
        return `c-chart__g c-chart__g--${this.id}`;
    },
    computeViewBox() {
      return `0 0 ${this.w} ${this.h}`;
    },
    computeWidth() {
      return this.w;
    },
    computeHeight() {
      return this.h;
    },
    computeInnerWidth() {
      return this.w - this.margin.left - this.margin.right;
    },
    computeInnerHeight() {
      return this.h - this.margin.top - this.margin.bottom;
    },
    computeTransform() {
      return `translate(${this.margin.left}, ${this.margin.top})`;
    }
  },
  methods: {
    createDataset() {
      const formatTime = parseTime(Consts.DATE_DMY);
      const xKey = this.chartData.axis.x;
      const yKey = this.chartData.axis.y;

      this.chart.parsedData = this.chartData.data.map((val) => {

          let item = {};
          item[xKey] = formatTime(val[xKey]),
          item[yKey] = val[yKey]
          
          return item;
      });

    },

  },
  beforeMount: function() {
    this.createDataset();
  },
}
</script>

<style>


.c-chart__dots--1 {
    fill: #ffab00;
    stroke: #fff;
}

.c-chart__tooltip--1 {
    position: absolute;			
    text-align: center;			
    width: 60px;					
    height: 28px;					
    padding: 2px;				
    font: 12px sans-serif;		
    background: lightsteelblue;	
    border: 0px;		
    border-radius: 8px;			
    pointer-events: none;	
}

.c-chart__gridlines line {
    stroke: lightgrey;
    stroke-opacity: 0.6;
    shape-rendering: crispEdges
}
.c-chart__gridlines path {
    stroke-width: 0;
}
</style>
