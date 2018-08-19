<template>
  <div :class="computedClass">
    <svg :class="computedSVGClass">
      <g :class="computedGClass">
        <Axis :chart="model" axis="x" :chartId="model.id" :chartMargin="model.margin"/>
        <Axis :chart="model" axis="y" :chartId="model.id" :chartMargin="model.margin"/>
        <LinePath :chart="model" :chartId="model.id" />
      </g>
    </svg> 
  </div>
</template>

<script>

import Axis from "../components/Axis";
import LinePath from "../components/LinePath";

import Consts from "../constants/Consts";
import { parseTime } from "../utilities/Utilities";
import Chart from "../drawing/Chart";

import Gridlines from "../drawing/Gridlines";

import Circle from "../shapes/Circle";
import AxisText from "../text/AxisText";

export default {
  name: 'LineChart',
  props: {
    chartData: Object
  },
  components: {
    Axis,
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
      computedClass: function() {
        const className = `c-chart__container c-chart__container--${this.chartData.id}`;

        return className;
      },
      computedSVGClass: function() {
        const className = `c-chart__svg c-chart__svg--${this.chartData.id}`;

        return className;
      },
      computedGClass: function() {
        const className = `c-chart__g c-chart__g--${this.chartData.id}`;

        return className;
      }
  },
  methods: {
    setModel: function() {
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
    createDataset: function(model) {
      const formatTime = parseTime(Consts.DATE_DMY);

      const dataset = this.model.data.map((val) => {

          let item = {};
          item[this.model.xKey] = formatTime(val[this.model.xKey]),
          item[this.model.yKey] = val[this.model.yKey]
          
          return item;
      });

       this.model.dataset = dataset;
    },
    createChart: function() {

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
    // createScales: function(chart) {
    //     const scale = new Scale(chart);
    //     const scales = scale.initialise();

    //     this.chart.xScale = scales.xScale;
    //     this.chart.yScale = scales.yScale;
    // },

    // createLine: function() {
    //     const line = new Line(this.chart, this.model.dataset)
    //     line.draw();
    // },

    createAxis: function() {
        const axis = new Axis(this.chart);
        const axisText = new AxisText(this.chart);
    },
    
    createGridlines: function() {
        const gridlines = new Gridlines(this.chart);
        gridlines.addMultiGridLines(this.chart.config.gridline);
    },

    createDots: function() {
        const dots = new Circle(this.chart, this.model.dataset);
        dots.draw();
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

    this.setModel();

    this.createDataset();
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
