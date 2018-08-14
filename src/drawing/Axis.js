import * as d3 from "d3";
import Consts from "../constants/Consts";

class Axis {

    constructor(chart) {

        this.chart = chart;

        this.create(Consts.X);
        this.create(Consts.Y);
    
    }

    create(type) {

        this.createG(type);

        if(type === Consts.X) {
            this.addXAxis(this.chart.chartHeight, this.chart.xScale, type);
        } else if (type === Consts.Y) {
            this.addYAxis(this.chart.yScale, type);
        }
                    
    }

    createG(type) {
        
        this.chart.g.append(Consts.G)
            .attr(Consts.CLASS, `c-axis-${type}`);
    }

    addXAxis(height, xScale, type) {

        this.chart.g.select(`.c-axis-${type}`)
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)
                    .tickFormat(d3.timeFormat(Consts.DATE_DMY)));
    }

    addYAxis(yScale, type) {

        this.chart.g.select(`.c-axis-${type}`)
            .call(d3.axisLeft(yScale));
    }

    resize(chart) {
        
        this.addXAxis(chart.chartHeight, chart.xScale, Consts.X);
        this.addYAxis(chart.yScale, Consts.Y);
    }
}

export default Axis;