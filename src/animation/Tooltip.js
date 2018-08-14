import * as d3 from "d3";
import Consts from "../constants/Consts";

class Tooltip {

    constructor(chart) {
   
        this.className = "c-tooltip";
        this.target = "body";
        this.element = "div";
        this.chart = chart;

    }

    create() {

        return d3.select(this.target)
            .append(this.element)
            .attr(Consts.CLASS, this.className)
            .style("opacity", 0);
    }

    draw(circles) {

        const tooltipDiv = this.create();

        let chart = this.chart;

        var dots = circles.on("mouseover", function (d) {
            tooltipDiv.transition()
                .duration(200)
                .style("opacity", .9);
            tooltipDiv.html(`Sessions: ${d[chart.yKey]}`)
                .style("left", `${(d3.event.pageX)}px`)
                .style("top",`${(d3.event.pageY - 28)}px`);
        })
        .on("mouseout", function (d) {
            tooltipDiv.transition()
                .duration(500)
                .style("opacity", 0);
        });

        return dots;

    }


}

export default Tooltip;