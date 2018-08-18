<template>
  <div id="app">
    <LineChart :chartData="lineChart1" />
    <!-- <PieChart :pieData="pieData1" />
    <LineChart :chartData="lineChart2" /> -->
  </div>
</template>

<script>
import Vue from 'vue';
import Vuex from 'vuex';

import LineChart from './charts/LineChart.vue';
import PieChart from './components/PieChart.vue';

Vue.use(Vuex);

const lineChart1 = {
  id: 1,
  data: [
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
  ],
  axis: {
    x: "date",
    y: "sessions",
    labelX: "Date (last month)",
    labelY: "Sessions"
  },
  settings: {
    tooltips: true,
    curve: true,
    gridlines: false
  }
}

const lineChart2 = {
  data: [
          { date: "1-May-12", sessions: 25 },
          { date: "2-May-12", sessions: 31 },
          { date: "3-May-12", sessions: 100 },
          { date: "4-May-12", sessions: 55 },
          { date: "5-May-12", sessions: 35 },

  ],
  containerName: "linechart2",
  axis: {
    x: "date",
    y: "sessions",
    labelX: "Date (last month)",
    labelY: "Sessions"
  },
  settings: {
    curve: false,
    gridlines: false
  }
}

const pieData1 = {
  containerName: "piechart",
  data: [
    { type: "Session complete", sessions: 50 },
    { type: "Session abandoned", sessions: 20 },
    { type: "Session return", sessions: 30 }
  ],
  key: "sessions"
}

const mutations = {
  UPDATE_LINECHART (state, v) {
    state.linechart = Object.assign(state.linechart, v);
  }
};

const store = new Vuex.Store({
  state: {
    linechart: {
      id: 0,
      xScale: "",
      yScale: ""
    }
  },
  mutations,

});


export default {
  name: 'app',
  store,
  components: {
    LineChart,
    PieChart
  },
  data() {
    return {
      lineChart1,
      lineChart2,
      pieData1
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
