import * as d3 from "d3";
import Consts from "../constants/Consts";

class Legend {

    constructor(chart) {

        this.chart = chart;

        this.className = "c-legend";
        this.data = this.chart.data;
    
    }

    draw() {

        const pieKey = this.chart.key;

        const pie = d3.pie()
                        .sort(null)
                        .value(function (d) { 
                            return d[pieKey]
                        });

        let legend = this.chart.svg.selectAll(`.${this.className}`) 
                            .data(pie(this.data))
                            .enter().append(Consts.G)
                            .attr("transform", function(d,i){
                                return "translate(" + (200) + "," + (i * 15 + 20) + ")"; 
                            })      
                            .attr(Consts.CLASS, this.className);   

        const arcClass = this.className;
        legend.append(Consts.RECT) 
                    .attr(Consts.WIDTH, 10)
                    .attr(Consts.HEIGHT, 10)
                    .attr(Consts.CLASS,function(d) { 
                        return `${arcClass} ${arcClass}__rect--${d.index}`;
                });

        legend.append(Consts.TEXT) 
                .text(function(d){
                    return d.data.sessions + "  " + d.data.type;
                })
                .attr(Consts.CLASS, "legend-text")
                .attr(Consts.Y, 10)
                .attr(Consts.X, 11);

              
    }

}

export default Legend;