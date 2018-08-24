<template>
  <div :class="computedClass">
    <svg :class="computedSVGClass" :width="computeWidth" :height="computeHeight" preserveAspectRatio="xMinYMin meet" :viewBox="computeViewBox">
      <g :class="computedGClass" >
        <Gridlines :chart="chartData"/> 
        <!-- <Axis :chart="model" axis="x" :chartId="model.id" :chartMargin="model.margin"/>
        <Axis :chart="model" axis="y" :chartId="model.id" :chartMargin="model.margin"/> -->
        <!-- <LinePath :chart="model" :chartId="model.id" />
        <AxisText :chart="model" axis="x" :chartId="model.id" :chartMargin="model.margin"/>
        <AxisText :chart="model" axis="y" :chartId="model.id" :chartMargin="model.margin"/> -->
      </g>
    </svg> 
  </div>
</template>

<script>

import Axis from "../components/Axis";
import LinePath from "../components/LinePath";
import AxisText from "../text/AxisText";
import Gridlines from "../components/Gridlines";
import Consts from "../constants/Consts";
import { parseTime } from "../utilities/Utilities";
import Chart from "../drawing/Chart";
import Circle from "../shapes/Circle";

export default {
  name: 'LineChart',
  props: {
    chartData: Object
  },
  components: {
    Axis,
    AxisText,
    LinePath,
    Gridlines
  },
  data: function() {
    return {
      chart: this.chartData,
      parsedData: [],
      svg: {},
      w: 400,
      h: 400
    }
  },
  computed: {
    computedClass() {
        return `c-chart__container c-chart__container--${this.chartData.id}`;
    },
    computedSVGClass() {
        return `c-chart__svg c-chart__svg--${this.chartData.id}`;
    },
    computedGClass() {
        return `c-chart__g c-chart__g--${this.chartData.id}`;
    },
    computeViewBox() {
      return `0 0 ${this.w} ${this.h}`;
    },
    computeWidth() {
      return this.w;
    },
    computeHeight() {
      return this.h;
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

    createChart() {


      // const lineChart = new Chart(this.chartData);
      // this.chart = lineChart.initialise();

      // if(this.chart.svg instanceof Error) {
      //   return;
      // }

      // this.chart.g = lineChart.setGroup(this.chart.margin.left, this.chart.margin.top);

      // this.createGridlines();
 
      // this.createDots();

      // this.resize();

    },
  },
  mounted: function() { 

    // this.setchartData();

    this.createDataset();
  },
  updated() {
    this.createChart();
  }
}
</script>

<style>

.c-chart__container {
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.c-chart__linechart2 .c-line {
  fill: none;
  stroke: #019fde;
  stroke-width: 3;
}

.c-chart__linechart2 .c-dot {
  fill: #019fde;
  stroke: #fff;
}

.c-chart__line {
    fill: none;
    stroke: #ffab00;
    stroke-width: 3;
}

.c-chart__dots--1 {
    fill: #ffab00;
    stroke: #fff;
}

.c-chart__tooltip {
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
