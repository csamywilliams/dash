
import * as d3 from "d3";

function Transition(path) {

    const duration = 2000;

    path.transition()
        .duration(duration)
        .attrTween("stroke-dasharray", tweenDash);
}

function tweenDash() {
    const l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function (t) { return i(t); };
}


export default Transition;