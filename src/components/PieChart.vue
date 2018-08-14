<template>
  <div :class="computedClass"></div>
</template>

<script>

import Chart from "../drawing/Chart";
import Arc from "../shapes/Arc";
import ArcText from "../text/ArcText";

export default {
  name: 'PieChart',
  props: {
    pieData: Object
  },
  computed: {
      computedClass: function() {
            let className = `c-chart__${this.pieData.containerName}`;

            return className;
      },
      createChartModel: function() {
        const containerName = this.computedClass;

        let props = {};
        props.data = this.pieData.data;
        props.container = containerName;
        props.margin = { 
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        };
        props.key = this.pieData.key;

        return props;
      }
  },
  mounted: function() { 

    const model = this.createChartModel;

    const pieChart = new Chart(model);
    let chart = pieChart.initialise();

    chart = Object.assign(chart, model);

    chart.g = pieChart.setGroup(chart.chartWidth / 2 , (chart.chartHeight / 2) );

    new Arc(chart).draw();
    new ArcText(chart).draw();

    // let createLegend = (data) => {
        
    //     let legend = chart.svg.selectAll(".legend") 
    //             .data(pie(data))
    //             .enter().append("g")
    //             .attr("transform", function(d,i){
    //                 return "translate(" + (legendWidth) + "," + (i * 15 + 20) + ")"; 
    //             })      
    //             .attr("class", "legend");   

    //     legend.append("rect") 
    //                 .attr("width", 10)
    //                 .attr("height", 10)
    //                 .attr("fill", function(d, i) {
    //                     return colours(d.index);
    //     });

    //     legend.append("text") 
    //             .text(function(d){
    //                 return d.data.sessions + "  " + d.data.type;
    //             })
    //             .attr("class", "legend-text")
    //             .attr("y", 10)
    //             .attr("x", 11);
    // }

    // createLegend(chart.data);
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

.c-pie__arc--0 {
    fill: #c8feff;
}

.c-pie__arc--1 {
    fill: #99cc66;
}

.c-pie__arc--2 {
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
