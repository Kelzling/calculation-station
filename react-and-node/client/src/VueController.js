import CorrelationCalculator from './CorrelationCalculator.js'
import RegressionCalculator from './RegressionCalculator.js'

var dataTable = {
  props: ['data'],
  template: '<table><tr v-for="(number, index) in data" v-bind:key="index"><td>{{ number }}</td></tr></table>'
}

var vueController = new Vue({
    el: '#vue-app',
    data: {
      myCorrCalc: new CorrelationCalculator(),
      myRegrCalc: new RegressionCalculator(),
      inputString: '',
      inputArrayOne: [],
      inputArrayTwo: [],
      result: null,
      inputMode: 'text',
      delimiter: ',',
      calcType: '',
      displayScreen: 'Data Entry 1',
      validScreens: ['Data Entry 1', 'Data Entry 2', 'Choose Calculation', 'Display Results'],
      error: ''
    },
    methods: {
      resetCalculator: function () {
        this.error = ''
        this.inputString = ''
        this.inputArrayOne = []
        this.inputArrayTwo = []
        this.result = null
        this.calcType = ''
        this.changeScreen('Data Entry 1')
      },
      changeScreen: function (newScreen) {
        if (!this.error) {
          if (this.validScreens.includes(newScreen)) {
            this.displayScreen = newScreen
          } else {
            console.warn('Change Screen Failed: Screen Was Not Valid')
          }
        } else {
          this.displayScreen = "Error"
        }
      },
      toggleInputMode: function () {
        this.inputMode = (this.inputMode === 'text') ? 'file' : 'text'
        this.delimiter = (this.inputMode === 'text') ? ',' : '\r\n'
      },
      handleFileInput: function(e, arrayNum) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.inputString = e.target.result
          this.processInput(arrayNum)
        }
        reader.readAsText(e.target.files[0])
      },
      processInput: function (arrayNum) {
        // split inputString on commas // future version - accepts the delimiter as an argument
        let splitString = this.inputString.split(this.delimiter)
        // for each element in the array
        let outputArray = []
        for (let aString of splitString) {
          // trim any white spaces off the ends, convert to a number, push into outputArray
          let aNum = Number(aString.trim())
          if (!isNaN(aNum)) {
            outputArray.push(aNum)
          } else {
            this.error = `${aString} could not be converted into a number`
            break
          }
        }
        this.inputString = ''
        if (arrayNum === 1) {
          this.inputArrayOne = outputArray
        } else if (arrayNum === 2) {
          this.inputArrayTwo = outputArray
        }
      },
      setCalcType: function(type) {
        this.calcType = type
      },
      setXK: function() {
        this.xK = Number(this.inputString)
      },
      performCalculation: function () {
        if (this.calcType === 'correlation') {
          this.result = this.myCorrCalc.runCalculator(this.inputArrayOne, this.inputArrayTwo)
        } else if (this.calcType === 'regression') {
          this.result = this.myRegrCalc.runCalculator(this.inputArrayOne, this.inputArrayTwo, this.xK)
        }
        if (typeof this.result === 'string') {
          // if it's a string, there's an error
          this.error = this.result
        } // should probably add something to handle whether something else is returned e.g. null
      }
    },
    components: {
      'data-table': dataTable
    }
  })
