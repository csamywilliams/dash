import * as d3 from "d3";

export function max (data, key) {
    return d3.max(data, function (d) { 
        return d[key]; 
    })
}