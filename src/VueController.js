var dataTable = {
  props: ['data'],
  template: '<table><tr v-for="(number, index) in data" v-bind:key="index"><td>{{ number }}</td></tr></table>'
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
      inputMode: 'text',
      delimiter: ',',
      calcType: '',
      displayScreen: 'Data Entry 1',
      validScreens: ['Data Entry 1', 'Data Entry 2', 'Choose Calculation', 'Display Results'],
      error: ''
    },
    methods: {
      resetCalculator: function () {
        this.inputString = ''
        this.inputArrayOne = []
        this.inputArrayTwo = []
        this.result = null
        this.calcType = ''
        this.changeScreen('Data Entry 1')
      },
      changeScreen: function (newScreen) {
      if (this.validScreens.includes(newScreen)) {
          this.displayScreen = newScreen
          this.error = ''
        } else {
          console.warn('Change Screen Failed: Screen Was Not Valid')
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
        splitString.forEach(aString => {
          // trim any white spaces off the ends, convert to a number, push into outputArray
          let aNum = Number(aString.trim())
          if (!isNaN(aNum)) {
            outputArray.push(aNum)
          } else {
            this.error = `${aString} could not be converted into a number`
          }
        })
        this.inputString = ''
        if (arrayNum === 1) {
          this.inputArrayOne = outputArray
          this.changeScreen('Data Entry 2')
        } else if (arrayNum === 2) {
          this.inputArrayTwo = outputArray
          this.changeScreen('Choose Calculation')
        }
      },
      performCalculation: function (type) {
        this.calcType = type
        if (this.calcType === 'correlation') {
          this.result = this.myCorrCalc.runCalculator(this.inputArrayOne, this.inputArrayTwo)
        } else if (this.calcType === 'regression') {
          this.result = this.myRegrCalc.runCalculator(this.inputArrayOne, this.inputArrayTwo)
        }
        if (typeof this.result === 'object' && this.result) { // typeof null also evaluates to object so also checking if result is true to make sure the object actually contains something
          this.changeScreen('Display Results')
        } else if (typeof this.result === 'string') {
          // if it's a string, there's an error, so we kick them back to the start screen.
          this.changeScreen('Data Entry 1')
        } // should probably add something to handle whether something else is returned e.g. null
      }
    },
    components: {
      'data-table': dataTable
    }
  })
}