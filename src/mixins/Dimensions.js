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

        onResize() {
            this.containerHeight = this.getChartHeight();
            this.containerWidth = this.getChartWidth();
            this.height = this.getSVGHeight();
            this.width = this.getSVGWidth();

            console.log(this.height);
            console.log(this.width);
        }
    
    },
    mounted() {
        this.containerHeight = this.getChartHeight();
        this.containerWidth = this.getChartWidth();

        window.addEventListener('resize', this.onResize);
    },
    updated() {
        this.height = this.getSVGHeight();
        this.width = this.getSVGWidth();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize);
    }
}

export default Dimensions;