import * as d3 from "d3";
import Consts from "../constants/Consts";

class Tooltip {

    constructor(chart) {

        this.target = "body";
        this.element = "div";
        this.chart = chart;
    
    }

    create() {

        const className = `c-chart__tooltip c-chart__tooltip--${this.chart.id}`;

        return d3.select(`.${className}`)
            .append(this.element)
            .attr(Consts.CLASS, className)
            .style("opacity", 0);
    }

    draw(circles) {

        const chart = this.chart;
        const xKey = this.chart.axis.x;
        const yKey = this.chart.axis.y;
        let tooltipDiv = this.create();

        circles.on("mouseover", function (d) {
            tooltipDiv.transition()
                .duration(200)
                .style("opacity", .9);
            tooltipDiv.html(`Sessions: ${d[yKey]}`)
                .style("left", `${(d3.event.pageX)}px`)
                .style("top",`${(d3.event.pageY - 28)}px`);
        })
        .on("mouseout", function (d) {
            tooltipDiv.transition()
                .duration(500)
                .style("opacity", 0);
        });

        return circles;

    }


}

export default Tooltip;