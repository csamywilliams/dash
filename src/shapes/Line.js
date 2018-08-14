import * as d3 from "d3";
import Consts from "../constants/Consts";
import Transition from "../animation/Transition";

class Line {

    constructor(chart, data) {

        this.data = data;
        this.chart = chart;
        this.config = this.chart.config;
        this.className = "c-line";
    }

    create(chart) {

        let props = chart;

        var l =  d3.line()
                    .x(function (d) {
                        return props.xScale(d[props.xKey]); 
                    })
                    .y(function (d) { 
                        return props.yScale(d[props.yKey]); 
                    });

        l = this.addCurve(l);

        return l;
    }

    addCurve(line) {
  
        if(this.config.hasOwnProperty("curve") && this.config.curve === true) {
            return line.curve(d3.curveMonotoneX);
        }

        return line;
    }

    draw() {

        this.chart.g.append(Consts.PATH)
            .attr(Consts.CLASS, this.className)
            .datum(this.data)
            .attr(Consts.D, this.create(this.chart))
            .call(Transition);
    }

    resize(chart) {

        this.chart.g.select(`.${this.className}`)
            .datum(this.data)
            .attr("d", this.create(chart))
            .call(Transition);
    }

}

export default Line;