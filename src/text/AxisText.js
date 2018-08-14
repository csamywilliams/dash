import Consts from "../constants/Consts";
import Defaults from "../constants/Defaults";
import Transform from "../drawing/Transform";

class AxisText {

    constructor(chart) {

        this.chart = chart;

        this.classNameX = `c-axis-${Consts.X}__text`;
        this.classNameY = `c-axis-${Consts.Y}__text`;

        this.create(this.classNameX)
        this.drawX();
        this.create(this.classNameY)
        this.drawY();

    }

    create(className) {

        this.chart.g.append(Consts.TEXT)
            .attr(Consts.CLASS, className);
                    
    }

    drawX() {

        let translate = new Transform().translate((this.chart.chartWidth / 2), (this.chart.chartHeight + Defaults.margin.top + 20));

        this.chart.g.select(`.${this.classNameX}`)
            .attr("transform", translate)
            .attr(Consts.CLASS, this.classNameX)
            .style("text-anchor", "middle")
            .text(this.chart.labelX);
    }

    drawY() {

        this.chart.g.select(`.${this.classNameY}`)
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - Defaults.margin.right)
            .attr("x", 0 - (this.chart.chartHeight / 2))
            .attr(Consts.CLASS, this.classNameY)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(this.chart.labelY);
    }

    resize(chart) {


        this.chart.g.select(`.${this.classNameX}`)
        .attr("transform", "translate(" + (chart.chartWidth / 2) + " ," +
                            (chart.chartHeight + Defaults.margin.top + 20) + ")");

        this.chart.g.select(`.${this.classNameY}`)
            .attr("y", 0 - Defaults.margin.right)
            .attr("x", 0 - (chart.chartHeight / 2));


    }

}

export default AxisText;