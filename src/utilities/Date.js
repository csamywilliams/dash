import * as d3 from "d3";
import Consts from "../constants/Consts";
import { parseTime } from "../utilities/Utilities";

export function maxDateScale(data, target) {
    const parser = parseTime(Consts.DATE_DMY);

    return d3.max(data, function (d) { 
        return parser(d[target]); 
    });
}

export function minDateScale(data, target) {

    const parser = parseTime(Consts.DATE_DMY);

    return d3.min(data, function (d) { 
        return parser(d[target]); 
    });
}