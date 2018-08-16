const Dimensions = {

    data() {
      return {
        width: '',
        height: ''
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
        }
    },
    mounted() {
        this.height = this.getChartHeight();
        this.width = this.getChartWidth();
    }
}

export default Dimensions;