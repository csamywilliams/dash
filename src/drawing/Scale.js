import * as d3 from "d3";
import Consts from "../constants/Consts";
import Default from "../constants/Defaults";
import { parseTime } from "../utilities/Utilities";

class Scale {
    
    constructor(chart) {

        this.data = chart.data;
        this.parser = parseTime(Consts.DATE_DMY);
        this.chart = chart;
    }

    initialise() {
        this.xScale = this.createXScale(this.chart.xKey);
        this.yScale = this.createYScale(this.chart.yKey);

        return {
            xScale: this.xScale,
            yScale: this.yScale
        }
    }

    createXScale(key) {
        return d3.scaleTime()
            .domain([this.getMinScale(key, this.parser), this.getMaxScale(key, this.parser)])
            .range([0, this.chart.chartWidth]);
    }

    createYScale(key) {

        var yDomain = d3.max(this.data, function (d) { 
            return d[key]; 
        })

        return d3.scaleLinear()
            .domain([0, yDomain])
            .range([this.chart.chartHeight, 0]);
    }

    getMaxScale(target, parser) {
        return d3.max(this.data, function (d) { 
            return parser(d[target]); 
        });
    }

    getMinScale(target, parser) {
        return d3.min(this.data, function (d) { 
            return parser(d[target]); 
        });
    }

    resize(chart) {
        
        chart.xScale.range([0, chart.chartWidth - chart.margin.left]);
        chart.yScale.range([chart.chartHeight, 0]);

        return {
            xScale: chart.xScale,
            yScale: chart.yScale
        }

    }

}

export default Scale;