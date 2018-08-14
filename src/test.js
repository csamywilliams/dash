import * as d3 from "d3";

export default function() {
    var margin = { top: 50, right: 70, bottom: 100, left: 100 };
    var width = window.innerWidth - margin.left - margin.right;
    var height = window.innerHeight - margin.top - margin.bottom;

    var data = [
        { date: "1-May-12", sessions: 25 },
        { date: "2-May-12", sessions: 31 },
        { date: "3-May-12", sessions: 100 },
        { date: "4-May-12", sessions: 55 },
        { date: "5-May-12", sessions: 350 },
        { date: "6-May-12", sessions: 55 },
        { date: "7-May-12", sessions: 124 },
        { date: "8-May-12", sessions: 5 },
        { date: "9-May-12", sessions: 60 },
        { date: "10-May-12", sessions: 95 }
    ];

    // (function updateSessionBox(data) {

    //     var totalSessions = data.reduce(function (sum, item) {
    //         return sum + item.sessions;
    //     }, 0);

    //     if (totalSessions > 0) {
    //         document.getElementsByClassName("js-info-box__number")[0].innerHTML = totalSessions;
    //     }

    // }(data));

    var yAxisLabel = "Sessions";
    var xAxisLabel = "Days (last 30 days)";

    var dateFormat = "%d-%b-%y";

    var dots;

    var parseTime = d3.timeParse(dateFormat);

    var dtMax = d3.max(data, function (d) { return parseTime(d.date); });
    var dtMin = d3.min(data, function (d) { return parseTime(d.date); });

    var xScale = d3.scaleTime()
        .domain([dtMin, dtMax])
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) { return d.sessions; })])
        .range([height, 0]);

    var line = d3.line()
                .x(function (d) { return xScale(d.date); })
                .y(function (d) { return yScale(d.sessions); })
                .curve(d3.curveMonotoneX);

    var tooltipDiv = d3.select("body")
        .append("div")
        .attr("class", "c-tooltip")
        .style("opacity", 0);

    var dataset = data.map((val, i, arr) => {
        return {
            date: parseTime(val.date),
            sessions: val.sessions
        }
    });

    var svg = d3.select(".c-chart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)

    var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var graphAttributes = [
        {
            attr: "class",
            props: "x-axis",
            append: "g"
        },
        {
            attr: "class",
            props: "y-axis",
            append: "g"
        },
        {
            attr: "class",
            props: "x-axis-text",
            append: "text"
        },
        {
            attr: "class",
            props: "y-axis-text",
            append: "text"
        },
        {
            attr: "class",
            props: "grid-x o-chart-grid",
            append: "g"
        },
        {
            attr: "class",
            props: "grid-y o-chart-grid",
            append: "g"
        },
        {
            attr: "class",
            props: "c-dot",
            append: "circle"
        }
    ];

    graphAttributes.forEach(function (item) {
        g.append(item.append).attr(item.attr, item.props);
    });

    function addXAxis() {

        g.select(".x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)
                    .tickFormat(d3.timeFormat(dateFormat)));
    };
    addXAxis();

    function addYAxis() {

        g.select(".y-axis")
            .call(d3.axisLeft(yScale));
    };
    addYAxis();


    function addXAxisLabel() {

        g.select(".x-axis-text")
            .attr("transform",
                    "translate(" + (width / 2) + " ," +
                                (height + margin.top + 20) + ")")
            .attr("class", "x-axis-text c-axis c-axis__text")
            .style("text-anchor", "middle")
            .text(xAxisLabel);

    };
    addXAxisLabel();

    function addYAxisLabel() {

        g.select(".y-axis-text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.right)
            .attr("x", 0 - (height / 2))
            .attr("class", "y-axis-text c-axis c-axis__text")
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(yAxisLabel);

    };
    addYAxisLabel();

    function addXGridLine() {
        g.selectAll(".grid-x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale)
                    .tickSize(-height)
                    .tickFormat(""));
    }
 
    function addYGridLine() {
        g.selectAll(".grid-y")
            .call(d3.axisLeft(yScale)
                    .tickSize(-width)
                    .tickFormat(""));
    }

    function addMultiGridLines(both = true, single = "x") {
 
        if(both) {
            addXGridLine();
            addYGridLine();
        } else {
            if(single === "x") addXGridLine();
            if(single === "y") addYGridLine();
        }
    }
    addMultiGridLines();

    function draw() {

        width = (window.innerWidth / 1.25) - margin.left - margin.right;
        height = (window.innerHeight / 1.25) - margin.top - margin.bottom;

        svg.select(".c-chart")
                .attr("width", width)
                .attr("height", height)

        xScale.range([0, width]);
        yScale.range([height, 0]);

        addXAxis();
        addYAxis();

        addMultiGridLines();

        g.select('.c-line')
            .datum(dataset)
            .attr("d", line)
            .call(transition);

        g.select(".x-axis-text")
            .attr("transform", "translate(" + (width / 2) + " ," +
                                (height + margin.top + 20) + ")");

        g.select(".y-axis-text")
            .attr("y", 0 - margin.right)
            .attr("x", 0 - (height / 2));

        g.selectAll(".c-dot")
            .attr("cx", function(d) { return xScale(d.date) })
            .attr("cy", function(d) { return yScale(d.sessions) });
    }

    function transition(path) {

        var duration = 2000;

        path.transition()
            .duration(duration)
            .attrTween("stroke-dasharray", tweenDash);
    }

    function tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function (t) { return i(t); };
    }

    (function addPath(dataset, line) {

        g.append("path")
            .datum(dataset)
            .attr("class", "c-line")
            .attr("d", line)
            .call(transition);

    }(dataset, line));

     function createDots(svg, data) {
         var dots = g.selectAll(".c-dot")
                     .data(dataset)
                     .enter()
                     .append("circle")
                     .attr("class", "c-dot")
                     .attr("cx", function(d) { return xScale(d.date) })
                     .attr("cy", function(d) { return yScale(d.sessions) })
                     .attr("r", 5);

         dots.on("mouseover", function (d) {
                 tooltipDiv.transition()
                     .duration(200)
                     .style("opacity", .9);
                 tooltipDiv.html(d.date + "<br/>" + d.sessions)
                     .style("left", (d3.event.pageX) + "px")
                     .style("top", (d3.event.pageY - 28) + "px");
             })
             .on("mouseout", function (d) {
                 tooltipDiv.transition()
                     .duration(500)
                     .style("opacity", 0);
             });

         return dots;
    }
    createDots();



    window.addEventListener("resize", draw);

}
