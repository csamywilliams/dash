import * as d3 from "d3";
import Consts from "../constants/Consts";

class Chart {

    constructor(model) {

        this.id = model.id;
        this.container = model.container,
        this.data = model.data;
        this.margin = model.margin;
        this.model = model;
    }

    initialise() {

        if(typeof this.container === "undefined") {
            return Error("Chart requires a container class name to render!");
        }

        this.getContainerSize();

        let width = this.width + this.margin.left + this.margin.right;
        let height = this.height + this.margin.top + this.margin.bottom;

        this.svg = this.create();
        this.svg = this.setSize(width, height);
    
        let chart = {
            svg: this.svg,
            g: this.g,
            chartWidth: this.width,
            chartHeight: this.height
        };

        chart = Object.assign(chart, this.model);

        return chart;
        
    }

    create() {

        return d3.select(`.c-chart__container--${this.id} svg`);
        
    }

    setSize(w, h) {

        return this.svg.attr(Consts.WIDTH, w)
                    .attr(Consts.HEIGHT, h)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 " + w + " " + h)
                    .classed(`c-chart__svg--${this.id}`, true);
    }

    setGroup(x, y) {

        return d3.select(`.c-chart__g--${this.id}`).attr("transform", "translate(" + x + "," + y + ")");

    }

    resize() {

        this.getContainerSize();

        const w = this.width;
        const h = this.height;

        this.svg.select(`.${this.container}`)
                .attr(Consts.WIDTH, w)
                .attr(Consts.HEIGHT, h)

        return {
            chartWidth: w,
            chartHeight: h   
        };
    }

    getContainerSize() {

        let container = document.getElementsByClassName(`${this.container}`)[0];

        this.width = container.offsetWidth - this.margin.left - this.margin.right;
        this.height = container.offsetHeight - this.margin.top - this.margin.bottom;
    }

}

export default Chart;