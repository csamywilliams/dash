import Consts from "../constants/Consts";
import Tooltip from "../animation/Tooltip";

class Circle {

    constructor(chart, data) {

       this.chart = chart; 
       this.data = data;
       this.className = "c-dot";
       this.create();

    }

    create() {

        this.chart.g.append(Consts.G)
            .attr(Consts.CLASS, this.className);

    }

    draw() {

        let props = this.chart;

        const circles = this.chart.g.selectAll(`.${this.className}`)
                .data(this.data)
                .enter()
                .append(Consts.CIRCLE)
                .attr(Consts.CLASS, this.className)
                .attr(Consts.CX, function(d) { 
                    return props.xScale(d[props.xKey]) 
                })
                .attr(Consts.CY, function(d) { 
                    return props.yScale(d[props.yKey]) 
                })
                .attr(Consts.R, this.circleRadius(props));

        if(props.config.tooltips) {
            new Tooltip(props).draw(circles);
        }

        return circles;
    }

    circleRadius(obj) {
        
        if(obj.config.hasOwnProperty("radius") && typeof obj.config.radius !== "undefined") {
            return obj.config.radius;
        }

        return Consts.DOT_RADIUS;
    }

    resize(props) {
        this.chart.g.selectAll(`.${this.className}`)
                    .attr(Consts.CX, function(d) { return props.xScale(d[props.xKey]); })
                    .attr(Consts.CY, function(d) { return props.yScale(d[props.yKey]); });
    }

}

export default Circle;