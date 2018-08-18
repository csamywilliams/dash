const Dimensions = {

    data() {
      return {
        containerWidth: "",
        containerHeight: "",
        height: "",
        width: ""
      }
    },
    methods: {
        getChartDimensions: function() {
            const cls = `c-chart__container--${this.chartId}`;
            return document.getElementsByClassName(cls)[0];
        },
    
        getChartHeight: function() {
            return this.getChartDimensions().offsetHeight;
        },
    
        getChartWidth: function() {
            return this.getChartDimensions().offsetWidth;
        },

        getSVGHeight() {
            return this.containerHeight - this.chart.margin.top - this.chart.margin.bottom;
        },
    
        getSVGWidth() {
            return this.containerWidth - this.chart.margin.left - this.chart.margin.right;
        },
    
    },
    mounted() {
        this.containerHeight = this.getChartHeight();
        this.containerWidth = this.getChartWidth();
    },
    updated() {
        this.height = this.getSVGHeight();
        this.width = this.getSVGWidth();
    }
}

export default Dimensions;