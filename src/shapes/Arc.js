import * as d3 from "d3";
import Consts from "../constants/Consts";

class Arc {

    constructor(chart) {

       this.chart = chart; 
       this.data = chart.data;
       this.className = "c-pie";
       this.radius = Math.min(this.chart.chartWidth, this.chart.chartHeight) / 1.75;
       
    }

    create(outerRadius, innerRadius) {

        return d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)
            .cornerRadius(5);

    }

    draw() {
        
        const pieKey = this.chart.key;

        const pie = d3.pie()
                        .sort(null)
                        .value(function (d) { 
                            return d[pieKey]
                        });

        let arcClass = this.className;

        this.chart.g = this.chart.g.selectAll(`.${arcClass}`)
            .data(pie(this.data))
            .enter().append(Consts.G)
            .attr(Consts.CLASS,function(d) { 
                return `${arcClass} ${arcClass}__arc--${d.index}`;
        });

        this.addPath();
    }

    addPath() {

        const arc = this.create(0, this.radius - 20);
        const arcClass = this.className;

        this.chart.g.append(Consts.PATH)
                .attr(Consts.D, arc)
                .attr(Consts.CLASS, function(d) { 
                    return `${arcClass}__path ${arcClass}__path--${d.index}`;
                }) 
                .transition().delay(function(d, i) { return i * 500; }).duration(500)
                .attrTween('d', function(d) {
                   var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
                   return function(t) {
                     d.endAngle = i(t);
                     return arc(d);
                   };
                });

    }

    getRadius() {
        this.radius = Math.min(this.chart.chartWidth, this.chart.chartHeight) / 2;

        return this.radius;
    }

}

export default Arc;