import * as d3 from "d3";
import Consts from "../constants/Consts";
import { parseTime } from "../utilities/Utilities";
import { maxDateScale, minDateScale } from "../utilities/Date";
import { max } from "../utilities/MinMax";

export function lineScale(chart, width, height) {

    const data = chart.data;

    const axis = {
        x: {
            h: 0,
            w: width,
            min: minDateScale(data, chart.axis.x),
            max: maxDateScale(data, chart.axis.x)
        },
        y: {
            h: height,
            w: 0,
            min: 0,
            max: max(data, chart.axis.y)
        }
    };

    return {
        xScale: createTimeScale(axis.x),
        yScale: createLinearScale(axis.y)
    }
}

function createTimeScale(config) {

    return d3.scaleTime()
             .domain([config.min, config.max])
             .range([config.h, config.w]);
}

function createLinearScale(config) {

    return d3.scaleLinear()
             .domain([config.min, config.max])
             .range([config.h, config.w]);
}