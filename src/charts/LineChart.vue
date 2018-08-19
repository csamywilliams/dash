<template>
  <div :class="computedClass">
    <svg :class="computedSVGClass">
      <g :class="computedGClass">
        <Axis :chart="model" axis="x" :chartId="model.id" :chartMargin="model.margin"/>
        <Axis :chart="model" axis="y" :chartId="model.id" :chartMargin="model.margin"/>
        <LinePath :chart="model" :chartId="model.id" />
        <AxisText :chart="model" axis="x" :chartId="model.id" :chartMargin="model.margin"/>
        <AxisText :chart="model" axis="y" :chartId="model.id" :chartMargin="model.margin"/>
      </g>
    </svg> 
  </div>
</template>

<script>

import Axis from "../components/Axis";
import LinePath from "../components/LinePath";
import AxisText from "../text/AxisText";
import Consts from "../constants/Consts";
import { parseTime } from "../utilities/Utilities";
import Chart from "../drawing/Chart";
import Gridlines from "../drawing/Gridlines";
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
  },
  data: function() {
    return {
      model: {
        id: this.chartData.id,
        container: "",
        xKey: "",
        yKey: "",
        labelX: "",
        labelY: "",
        config: {
          curve:"",
          radius: "",
          tooltips: "",
          gridlines: ""
        },
        data: "",
        margin: "",
      },
      chart: {}
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
    }
  },
  methods: {
    setModel() {
      this.model.id = this.chartData.id;
      this.model.container = this.computedClass;
      this.model.xKey = (this.chartData.axis.x).toLowerCase();
      this.model.yKey = (this.chartData.axis.y).toLowerCase();
      this.model.labelX = this.chartData.axis.labelX;
      this.model.labelY = this.chartData.axis.labelY;
      this.model.config = {
        curve: this.chartData.settings.curve,
        radius: this.chartData.settings.radius,
        tooltips: this.chartData.settings.tooltips,
        gridline: this.chartData.settings.gridlines
      };
      this.model.data = this.chartData.data;
      this.model.margin = {top: 20, right: 60, bottom: 50, left: 80};
      this.model.translateX = this.model.margin.left,
      this.model.translateY = this.model.margin.top
    },
    createDataset(model) {
      const formatTime = parseTime(Consts.DATE_DMY);

      const dataset = this.model.data.map((val) => {

          let item = {};
          item[this.model.xKey] = formatTime(val[this.model.xKey]),
          item[this.model.yKey] = val[this.model.yKey]
          
          return item;
      });

      this.model.dataset = dataset;
    },
    createChart() {

      const lineChart = new Chart(this.model);
      this.chart = lineChart.initialise();

      if(this.chart.svg instanceof Error) {
        return;
      }

      this.chart.g = lineChart.setGroup(this.chart.margin.left, this.chart.margin.top);

      // this.createGridlines();
 
      // this.createDots();

      // this.resize();

    },

    createGridlines() {
        const gridlines = new Gridlines(this.chart);
        gridlines.addMultiGridLines(this.chart.config.gridline);
    },

    createDots() {
        const dots = new Circle(this.chart, this.model.dataset);
        dots.draw();
    }, 
  },
  mounted: function() { 

    this.setModel();

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


</style>
