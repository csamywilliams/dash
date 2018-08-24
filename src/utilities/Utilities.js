import * as d3 from "d3";

export function parseTime(format) {
    return d3.timeParse(format);
}

export function timeScale() {
    return d3.scaleTime();
}

export function linearScale() {
    return d3.scaleLinear();
}