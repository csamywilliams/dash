import * as d3 from "d3";
import Consts from "../constants/Consts";
import Transform from "./Transform";

class Gridlines {

    constructor(chart) {

        this.chart = chart;

        this.classNameX = `c-gridlines__${Consts.X}`;
        this.classNameY = `c-gridlines__${Consts.Y}`;

        this.height = this.chart.chartHeight;
        this.width = this.chart.chartWidth;
        this.xScale = this.chart.xScale;
        this.yScale = this.chart.yScale;

        this.create(this.classNameX);
        this.create(this.classNameY); 
    }

    create(className) {
        this.chart.g.append(Consts.G)
            .attr(Consts.CLASS, className);
    }
   
    addMultiGridLines(multi = true) {

        if(multi === true) {
            this.addXGridLine();
            this.addYGridLine();
        }

        if(multi === Consts.X) this.addXGridLine();
        if(multi === Consts.Y) this.addYGridLine();

    }

    addXGridLine() {
        this.chart.g.selectAll(`.${this.classNameX}`)
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.xScale)
                    .tickSize(-this.height)
                    .tickFormat(""));
    }
 
    addYGridLine() {
        this.chart.g.selectAll(`.${this.classNameY}`)
            .call(d3.axisLeft(this.yScale)
                    .tickSize(-this.width)
                    .tickFormat(""));
    }

}

export default Gridlines;