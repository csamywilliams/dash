import * as d3 from "d3";

export function parseTime(format) {
    return d3.timeParse(format);
}