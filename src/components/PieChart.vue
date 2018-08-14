<template>
  <div :class="computedClass"></div>
</template>

<script>

import Chart from "../drawing/Chart";
import Legend from "../drawing/Legend";
import Arc from "../shapes/Arc";
import ArcText from "../text/ArcText";

export default {
  name: 'PieChart',
  props: {
    pieData: Object
  },
  data: function() {
    return {
      model: {
        data: "",
        container: "",
        margin: { 
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        key: ""
      }
    }
  },
  computed: {
      computedClass: function() {
            let className = `c-chart__${this.pieData.containerName}`;

            return className;
      }
  },
  methods: {
    setModel: function() {
      const containerName = this.computedClass;

      this.model.data = this.pieData.data;
      this.model.container = containerName;
      this.model.key = this.pieData.key;

      return this.model;
    },
    createChart: function() {

      const model = this.model;
      this.setModel();

      const pieChart = new Chart(model);
      let chart = pieChart.initialise();

      chart.g = pieChart.setGroup(chart.chartWidth / 2 , (chart.chartHeight / 2) );

      new Arc(chart).draw();
      new ArcText(chart).draw();
      new Legend(chart).draw();

    }
  },
  mounted: function() { 
    this.createChart();
  }
}
</script>

<style>

.c-chart__piechart {
  width: 100%;
  height: 100%;
  min-height: 300px;
  min-width: 300px;
  position: relative;
}

.c-pie__arc--0, .c-legend__rect--0 {
    fill: #c8feff;
}

.c-pie__arc--1, .c-legend__rect--1 {
    fill: #99cc66;
}

.c-pie__arc--2, .c-legend__rect--2 {
    fill: #c0c5ff;
}

.c-pie__text {
    fill: black;
    font: 9px sans-serif;
    text-anchor: middle;
}

.c-pie__path {
  stroke: #fff;
}

.legend {
     background-color: #F1F3F3;
     padding: 5px;
}

.legend-text {
    font-size: 12px;
}



</style>
