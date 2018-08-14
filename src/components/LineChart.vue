<template>
  <div :class="computedClass"></div>
</template>

<script>

import Consts from "../constants/Consts";
import { parseTime } from "../utilities/Utilities";
import Chart from "../drawing/Chart";
import Scale from "../drawing/Scale";
import Axis from "../drawing/Axis";
import Gridlines from "../drawing/Gridlines";
import Line from "../shapes/Line";
import Circle from "../shapes/Circle";
import AxisText from "../text/AxisText";

export default {
  name: 'LineChart',
  props: {
    chartData: Object
  },
  data: function() {
    return {
      model: {
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
        translateX: "",
        translateY: ""
      },
      chart: {}
    }
  },
  computed: {
      computedClass: function() {
        let className = `c-chart__${this.chartData.containerName}`;

        return className;
      },
  },
  methods: {
    setModel: function() {
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
    createDataset: function(model) {
      const formatTime = parseTime(Consts.DATE_DMY);

      const dataset = model.data.map((val) => {

          let item = {};
          item[model.xKey] = formatTime(val[model.xKey]),
          item[model.yKey] = val[model.yKey]
          
          return item;
      });

      return dataset;
    },
    createChart: function() {

      const model = this.model;
      this.setModel();

      const lineChart = new Chart(model);
      this.chart = lineChart.initialise();

      if(this.chart.svg instanceof Error) {
        return;
      }

      this.chart.g = lineChart.setGroup(this.chart.margin.left, this.chart.margin.top);

      const scale = new Scale(this.chart);
      const xyScales = scale.initialise();

      this.chart = { ...this.chart, xScale: xyScales.xScale, yScale: xyScales.yScale };

      const dataset = this.createDataset(this.chart);

      const line = new Line(this.chart, dataset)
      line.draw();

      const axis = new Axis(this.chart);
      const axisText = new AxisText(this.chart);

      const gridlines = new Gridlines(this.chart);
      gridlines.addMultiGridLines(this.chart.config.gridline);
      
      const dots = new Circle(this.chart, dataset);
      dots.draw();

      window.addEventListener('resize', () => {
          
          let tempChart = this.chart;  
          let resizeChart = lineChart.resize();
          tempChart = Object.assign(tempChart, resizeChart); //update obj with new h/w

          let tempScale = scale.resize(tempChart);  //update the xScale/yScale
          tempChart = Object.assign(tempChart, tempScale);

          line.resize(tempChart);
          axis.resize(tempChart);
          axisText.resize(tempChart);
          gridlines.addMultiGridLines(tempChart.config.gridline);
          dots.resize(tempChart);

      });

    }
  },
  mounted: function() { 

    this.createChart();
  }
}
</script>

<style>

.c-chart__linechart1, .c-chart__linechart2 {
  width: 100%;
  height: 100%;
  min-height: 300px;
}

.c-line {
    fill: none;
    stroke: #ffab00;
    stroke-width: 3;
}

.c-dot {
    fill: #ffab00;
    stroke: #fff;
}

.c-tooltip {
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
