var dataRow = {
  template: '<tr><td>{{ number }}}</td></tr>'
}

function main() {
  let vueController = new Vue({
    el: '#vue-app',
    data: {
      myCorrCalc: new CorrelationCalculator(),
      myRegrCalc: new RegressionCalculator(),
      inputString: '',
      inputArrayOne: [],
      inputArrayTwo: [],
      result: null,
      calcType: '',
      displayScreen: 'Data Entry 1'
    },
    methods: {},
    components: {
      'data-row': dataRow
    }
  })
}