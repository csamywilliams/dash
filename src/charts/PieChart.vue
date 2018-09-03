<template>
    <div :class="computedClass">
        <svg :class="computedSVGClass" :width="computeWidth" :height="computeHeight" preserveAspectRatio="xMinYMin meet" :viewBox="computeViewBox">
            <g :class="computedGClass" :transform="computeTransform" />
            <g :class="computedLegendClass" :transform="computeLegendTransform"  />
        </svg> 
  </div>
</template>

<script>

import * as d3 from "d3";
import Consts from "../constants/Consts";
import ChartLegend from "../components/ChartLegend";

export default {
    name: 'PieChart',
    components: {
        ChartLegend
    },
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
    data: function() {
        return {
            chart: this.chartData,
            w: 400,
            h: 400,
            margin: { 
                top: 20,
                right: 20,
                bottom: 30,
                left: 40
            },
            g: {},
            radius: function() {
              return Math.min(this.w, this.h) / 3;
            },
            pie: function(key) {
                return d3.pie()
                        .sort(null)
                        .value(function (d) { 
                            return d[key]
                        });
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
        computedLegendClass() {
            return `c-chart__legend c-chart__legend--${this.id}`;
        },
        computeLegendTransform() {
            const height = 0 - this.margin.top;
            return `translate(0, ${height}px)`;
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
        computeTransform() {
            const width = this.w / 2;
            const height = this.h / 2;
            return `translate(${width}, ${height})`;
        }
    },
    methods: {

        createChart: function() {

            const cls = `c-chart__arc c-chart__arc--${this.id} c-chart__slice c-chart__slice`;
            
            const pieAmount = this.chart.axis.amount;

            const pie = this.pie(pieAmount);

            this.g = d3.select(`.c-chart__g--${this.id}`)
                .selectAll(`.${cls}`)
                .data(pie(this.chart.data))
                .enter().append(Consts.G)
                .attr(Consts.CLASS, function(d) { 
                    return `${cls}--${d.index}`;
                }); 

            this.createPath();
            this.createLegend();
        
        },

        createPath() {
    
            const arc = d3.arc()
                .outerRadius(this.radius() - 10)
                .innerRadius(0);

    
            const cls = `c-chart__arc-path--${this.id}`;

            this.g.append(Consts.PATH)
            .attr(Consts.D, arc)
            .attr(Consts.CLASS, function(d) { 
                return `c-chart__arc-path ${cls} c-chart__pie-path c-chart__pie-path--${d.index}`;
            })
            .transition()
            .delay(function(d, i) { return i * 500; })
            .duration(500)
            .attrTween('d', function(d) {
                    var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                    return function(t) {
                    d.endAngle = i(t);
                    return arc(d);
                    };
                });
        },
        createLegend() {

            const cls = `c-chart__legend--${this.id}`;
            const arcCls = `c-chart__legend-rect-${this.id}`;
            const legendText = `c-chart__legend-text c-chart__legend-text--${this.id}`;
            const pieAmount = this.chart.axis.amount;
            const pieKey = this.chart.axis.key;
            const pie = this.pie(pieAmount);

            let legend = d3.select(`.${cls}`).selectAll(`.${cls}`)
                    .data(pie(this.chart.data))
                    .enter().append(Consts.G)
                    .attr("transform", function(d,i){
                        return "translate(" + 0 + "," + (i * 15 + 20) + ")"; 
                    });

            legend.append(Consts.RECT) 
                        .attr(Consts.WIDTH, 10)
                        .attr(Consts.HEIGHT, 10)
                        .attr(Consts.CLASS,function(d) {
                            return `${arcCls} ${arcCls}__rect--${d.index}`;
                    });

            legend.append(Consts.TEXT) 
                    .text(function(d) {
                        return d.data[pieKey];
                    })
                    .attr(Consts.CLASS, legendText)
                    .attr(Consts.Y, 10)
                    .attr(Consts.X, 11);
        }
    },
    mounted() {
      this.createChart();
    }
}
</script>
