import Consts from "../constants/Consts";
import Arc from "../shapes/Arc";

class ArcText {

    constructor(chart) {

        this.chart = chart;

        this.legendWidth = this.chart.chartWidth - this.chart.margin.left - this.chart.margin.bottom;

    }

    create(className) {

        this.chart.g.append(Consts.TEXT)
            .attr(Consts.CLASS, className);
                    
    }

    draw() {

        const arc = new Arc(this.chart);
        const radius = arc.getRadius();
        const labelArc = arc.create(radius - 50, radius - 50);
        
        const arcText = "c-pie__text";

        this.chart.g.append("text")
            .attr("transform", function(d) {
                return "translate(" + labelArc.centroid(d) + ")"; 
            })
            .attr("dy", ".50em")
            .attr(Consts.CLASS, function(d) { 
                return `${arcText} ${arcText}--${d.index}`;
            })
            .text(function(d) { return d.data.type; });
    }

}

export default ArcText;