const Scales = {

    data() {
      return {
        xScale: "",
        yScale: ""
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
    
    },
    mounted() {
        this.containerHeight = this.getChartHeight();
        this.containerWidth = this.getChartWidth();

        window.addEventListener('resize', this.onResize);
    }
}

export default Scales;