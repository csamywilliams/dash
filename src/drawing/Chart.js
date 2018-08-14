import * as d3 from "d3";
import Consts from "../constants/Consts";

class Chart {

    constructor(props) {

        this.container = props.container,
        this.data = props.data;
        this.svgChart = props;
        this.margin = props.margin;
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
    
        const chart = {
            svg: this.svg,
            g: this.g,
            chartWidth: this.width,
            chartHeight: this.height
        }

        return chart;
        
    }

    create() {
        
        return d3.select(`.${this.container}`)
            .append(Consts.SVG)
            

    }

    setSize(w, h) {

        return this.svg.attr(Consts.WIDTH, w)
                    .attr(Consts.HEIGHT, h)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 " + w + " " + h)
                    .classed("svg-content", true);
    }

    setGroup(x, y) {

        return this.svg.append(Consts.G)
                    .attr("transform", "translate(" + x + "," + y + ")");
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

        let c = document.getElementsByClassName(`${this.container}`)[0];

        this.width = c.offsetWidth - this.margin.left - this.margin.right;
        this.height = c.offsetHeight - this.margin.top - this.margin.bottom;
    }

}

export default Chart;