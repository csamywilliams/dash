import * as d3 from "d3";
import Consts from "../constants/Consts";
import Default from "../constants/Defaults";
import { parseTime } from "../utilities/Utilities";

class Scale {
    
    constructor(chart) {
        this.parser = parseTime(Consts.DATE_DMY);
    }

    createXScale(chart) {

        return d3.scaleTime()
            .domain([this.getMinScale(chart.data, chart.xKey, this.parser), this.getMaxScale(chart.data, chart.xKey, this.parser)])
            .range([0, chart.width]);
    }

    createYScale(chart) {

        var yDomain = d3.max(chart.data, function (d) { 
            return d[chart.yKey]; 
        })

        return d3.scaleLinear()
            .domain([0, yDomain])
            .range([chart.height, 0]);
    }

    getMaxScale(data, target, parser) {
        return d3.max(data, function (d) { 
            return parser(d[target]); 
        });
    }

    getMinScale(data, target, parser) {
        return d3.min(data, function (d) { 
            return parser(d[target]); 
        });
    }
}

export default Scale;