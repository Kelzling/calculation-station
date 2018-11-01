/* global Vue, FileReader */

import CorrelationCalculator from './CorrelationCalculator.js'
import RegressionCalculator from './RegressionCalculator.js'

var dataTable = {
  props: ['data'],
  template: '<table><tr v-for="(number, index) in data" v-bind:key="index"><td>{{ number }}</td></tr></table>'
}

var vueController = new Vue({ // eslint-disable-line no-unused-vars
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
    error: '',
    displayUI: 'react'
  },
  methods: {
    resetCalculator: function () {
      // reset all variables
      this.error = ''
      this.inputString = ''
      this.inputArrayOne = []
      this.inputArrayTwo = []
      this.result = null
      this.calcType = ''
      this.changeScreen('Data Entry 1')
    },
    changeScreen: function (newScreen) {
      // changes the screen to Error if there is one to display, otherwise to the desired screen as long as it's one that should exist.
      if (!this.error) {
        if (this.validScreens.includes(newScreen)) {
          this.displayScreen = newScreen
        } else {
          console.warn('Change Screen Failed: Screen Was Not Valid')
        }
      } else {
        this.displayScreen = 'Error'
      }
    },
    toggleInputMode: function () {
      // toggles the file input mode and the delimiter for input parsing
      this.inputMode = (this.inputMode === 'text') ? 'file' : 'text'
      this.delimiter = (this.inputMode === 'text') ? ',' : '\r\n'
    },
    handleFileInput: function (e, arrayNum) {
      // reads data in from a file and stores it into the input string
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
      // reset the input string and store the data in the appropriate array
      if (arrayNum === 1) {
        this.inputArrayOne = outputArray
      } else if (arrayNum === 2) {
        this.inputArrayTwo = outputArray
      }
    },
    setCalcType: function (type) {
      this.calcType = type
    },
    setXK: function () {
      // parses the xK input to a number and stores it
      this.xK = Number(this.inputString)
    },
    performCalculation: function () {
      // run the appropriate calculator
      if (this.calcType === 'correlation') {
        this.result = this.myCorrCalc.runCalculator(this.inputArrayOne, this.inputArrayTwo)
      } else if (this.calcType === 'regression') {
        this.result = this.myRegrCalc.runCalculator(this.inputArrayOne, this.inputArrayTwo, this.xK)
      }
      if (this.result.error) {
        // if there is an error, store it for display.
        this.error = this.result.error
      }
    }
  },
  components: {
    'data-table': dataTable
  }
})
