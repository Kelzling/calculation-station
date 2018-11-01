/* global FileReader, fetch */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'

class ResultsItem extends Component {
  render () {
    return (<li>{this.props.result[0]}: {this.props.result[1]}</li>)
  }
}

class Results extends Component {
  render () {
    // React can't handle rendering from object properties, so turn the data into tuples
    let data = Object.entries(this.props.data)
    return (
      <ol>{data.map(res => <ResultsItem result={res} />)}</ol>
    )
  }
}

class DataItem extends Component {
  render () {
    return (<tr><td>{this.props.number}</td></tr>)
  }
}

class DataTable extends Component {
  // creates a table displaying the data that has been entered by iterating over the array of numbers
  render () {
    return (<table>
      <tbody>
        {this.props.dataArray.map((num, index) => {
          return <DataItem key={index} number={num} />
        })}
      </tbody>
    </table>)
  }
}

class InputModeBtn extends Component {
  // Button for toggling between File and Text input modes.
  constructor (props) {
    super(props)
    this.state = {
      inputMode: 'text'
    }

    this.toggleInputMode = this.toggleInputMode.bind(this)
  }

  toggleInputMode () {
    // Tracks mode inside this component for display purposes, and passes the data back to the parent component via a callback function
    let newMode = (this.state.inputMode === 'text') ? 'file' : 'text'
    this.setState({
      inputMode: newMode
    })
    this.props.updateParent(newMode)
  }

  render () {
    // uses a ternary operator to determine what text to display on the button
    return (<button onClick={(e) => { this.toggleInputMode() }}>Switch to {this.state.inputMode === 'text' ? 'file' : 'text'} input</button>)
  }
}

class TextInput extends Component {
  // component created to handle filtering for Enter keypresses on an input box.
  constructor (props) {
    super(props)

    this.handleEnterKey = this.handleEnterKey.bind(this)
  }

  handleEnterKey (e) {
    // if the key that was pressed in the keydown event was enter, call the callback function from the parent, passing up the event for it to process
    if (e.key === 'Enter') {
      this.props.handleEnter(e)
    }
  }

  // binding handleEnterKey to onKeyDown in the JSX wouldn't work despite all the different ways I tried to do it, so I had to use the component's lifecycle methods to handle it instead
  componentDidMount () {
    ReactDOM.findDOMNode(this).addEventListener('keydown', this.handleEnterKey)
  }

  componentWillUnmount () {
    ReactDOM.findDOMNode(this).removeEventListener('keydown', this.handleEnterKey)
  }

  render () {
    return (<input id={this.props.id} className='data-input' />)
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      calcType: null,
      dataArrayOne: [],
      dataArrayTwo: [],
      result: {},
      displayScreen: 'Data Entry 1',
      inputMode: 'text',
      error: '',
      xK: 0
    }
    // doesn't need to change so can be declared as a static property
    this.validScreens = ['Data Entry 1', 'Data Entry 2', 'Choose Calculation', 'Perform Calculation', 'Display Results', 'Error']

    console.log(this.state)

    // bind This to all functions
    this.processInput = this.processInput.bind(this)
    this.performCalculation = this.performCalculation.bind(this)
    this.resetCalculator = this.resetCalculator.bind(this)
    this.changeScreen = this.changeScreen.bind(this)
    this.updateInputMode = this.updateInputMode.bind(this)
    this.createArrayString = this.createArrayString.bind(this)
    this.getResultFromServer = this.getResultFromServer.bind(this)
    this.updateDisplay = this.updateDisplay.bind(this)
  }

  updateInputMode (newMode) {
    // updates the input mode. Passed to InputModeBtn child component as a callback function
    this.setState({
      inputMode: newMode
    })
  }

  setCalcType (type) {
    // updates the calcType
    this.setState({
      calcType: type
    })
  }

  setXK (e) {
    // gets the xK value from an input box, parses it to a number, and stores it. Passed to a TextInput component as a callback function
    let input = document.getElementById('xK-input')
    let newXK = Number(input.value)
    console.log(newXK, '', input.value)
    this.setState({
      xK: newXK
    })
    input.value = ''
  }

  handleFileInput (arrayNum, e) {
    // reads file input and parses it into an array of data to be stored
    let reader = new FileReader()
    reader.onload = (e) => {
      let inputString = e.target.result
      this.processInput(inputString, arrayNum)
    }
    reader.readAsText(e.target.files[0])
  }

  handleTextInput (arrayNum, e) {
    // gets text input from an input box and parses it into an array of data to be stored. passed to TextInput child components as a callback function
    let input = document.getElementById(`data-input-${arrayNum}`)
    let inputString = input.value
    input.value = ''
    this.processInput(inputString, arrayNum)
  }

  processInput (inputString, arrayNum) {
    // turns a string containing numbers, either comma or newline separated, and parses it into an array of numbers
    // data was required to be in array format when app was directly interfacing with the calculators instead of through the server. Didn't want to completely redesign this part of the interface, so I left it the same so it could still be changed back to talking directly to the calculators instead of the server with ease.
    let delimiter = (this.state.inputMode === 'text') ? ',' : '\r\n'
    let splitString = inputString.split(delimiter)
    let outputArray = []
    let error = ''
    splitString.forEach(aString => {
      let aNum = Number(aString.trim())
      if (!isNaN(aNum)) {
        outputArray.push(aNum)
      } else {
        error = "Couldn't process input"
      }
    })
    // stores it in the attribute indicated by the arrayNum as long as there were no errors
    if (!error) {
      if (arrayNum === 1) {
        this.setState({ dataArrayOne: outputArray })
      } else if (arrayNum === 2) {
        this.setState({ dataArrayTwo: outputArray })
      }
    } else {
      this.setState({
        error: error
      })
    }
  }

  resetCalculator () {
    // re initialises all variables
    this.setState({
      calcType: null,
      dataArrayOne: [],
      dataArrayTwo: [],
      result: {},
      displayScreen: 'Data Entry 1',
      error: '',
      xK: 0
    })
  }

  changeScreen (newScreen) {
    // swaps between app screens
    if (!this.state.error) {
      if (this.validScreens.includes(newScreen)) {
        this.setState({
          displayScreen: newScreen
        })
      } else {
        console.warn('Change Screen Failed: Screen Was Not Valid')
      }
    } else {
      this.setState({
        displayScreen: 'Error'
      })
    }
  }

  createArrayString (anArray) {
    // turns the data arrays back into strings that are correctly structured to be passed in a URL
    let output = ''
    anArray.forEach((num, i, array) => {
      if (i !== array.length - 1) {
        output += `${num},`
      } else {
        output += `${num}`
      }
    })
    return output
  }

  async getResultFromServer (requestString) {
    // async function to make a request from the server for it to perform the calculation required
    let response = await fetch(requestString)
    // note to self - this .json function parses it for me. I tried to run JSON.parse on the already parsed object and it was not ok with that.
    let result = await response.json()

    if (response.status !== 200) {
      throw Error(result.message)
    }

    return result
  }

  updateDisplay (response) {
    // updates the state and display screen based upon the return from the server
    if (!response.error) {
      this.setState({
        result: response
      })
      this.changeScreen('Display Results')
    } else {
      this.setState({
        error: response.error
      })
      this.changeScreen('Error')
    }
  }

  performCalculation () {
    let urlString
    if (this.state.calcType === 'correlation') {
      urlString = `/calc-corr?${this.createArrayString(this.state.dataArrayOne)}&${this.createArrayString(this.state.dataArrayTwo)}`
    } else if (this.state.calcType === 'regression') {
      urlString = `/calc-regr?${this.createArrayString(this.state.dataArrayOne)}&${this.createArrayString(this.state.dataArrayTwo)}`
      if (this.state.xK) {
        urlString += `&${this.state.xK}`
      }
    }
    console.log(urlString)
    // talking to the server is an async function, so need to use .then to control the response to the resolving of the promise.
    this.getResultFromServer(urlString).then(response => {
      this.updateDisplay(response)
    }).catch(err => console.log(err))
  }

  /*  the following functions were from the tutorial I used to learn about the express server
  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  }; */

  render () {
    // for easier referring to
    const displayScreen = this.state.displayScreen
    const inputMode = this.state.inputMode
    // two variables used for conditional rendering inside the return statement
    let appScreen
    let inputXK

    // creates this element only if the calcType is regression when the component is rendered
    if (this.state.calcType === 'regression') {
      inputXK = (<div>
        <p>{this.state.xK ? 'xK set!' : 'Please enter an xK'}</p>
        <div className='data-input-container'>
          <TextInput id='xK-input' handleEnter={(e) => { this.setXK(e) }} />
          <input type='button' className='data-submit' value='Set xK' onClick={(e) => { this.setXK(e) }} />
        </div>
      </div>)
    }

    // sets the appScreen variable to different JSX depending on what the displayScreen and inputMode are. Used to conditionally render each screen of the app. I didn't feel like any of these were quite similar enough to create components for them all.
    if (displayScreen === 'Data Entry 1' && inputMode === 'text') {
      appScreen = (<div className='app-screen'>
        <p>Please enter your first lot of data, separated by commas</p>

        <div className='data-input-container'>
          <TextInput id='data-input-1' handleEnter={(e) => { this.handleTextInput(1, e); this.changeScreen('Data Entry 2') }} />
          <input type='button' className='data-submit' value='Submit Data' onClick={(e) => { this.handleTextInput(1, e); this.changeScreen('Data Entry 2') }} />
        </div>
      </div>)
    } else if (displayScreen === 'Data Entry 1' && inputMode === 'file') {
      appScreen = (<div className='app-screen'>
        <p>Please load your first data file. Each data item should be on a new line.</p>

        <input type='file' onChange={(e) => { this.handleFileInput(1, e); this.changeScreen('Data Entry 2') }} />
      </div>)
    } else if (displayScreen === 'Data Entry 2' && inputMode === 'text') {
      appScreen = (<div className='app-screen'>
        <p>Please enter your second lot of data, which must be the same length as the first, separated by commas</p>

        <p id='error-message'>{this.state.error ? `${this.state.error}, please reset calculator.` : ''}</p>

        <div className='data-input-container'>
          <TextInput id='data-input-2' handleEnter={(e) => { this.handleTextInput(2, e); this.changeScreen('Choose Calculation') }} />
          <input type='button' className='data-submit' value='Submit Data' onClick={(e) => { this.handleTextInput(2, e); this.changeScreen('Choose Calculation') }} />
        </div>
      </div>)
    } else if (displayScreen === 'Data Entry 2' && inputMode === 'file') {
      appScreen = (<div className='app-screen'>
        <p>Please load your second data file. Please ensure both files have the same amount of numbers.</p>

        <input type='file' onChange={(e) => { this.handleFileInput(2, e); this.changeScreen('Choose Calculation') }} />
      </div>)
    } else if (displayScreen === 'Choose Calculation') {
      appScreen = (<div className='app-screen'>
        <p>Would you like to calculate the correlation or the regression of your data?</p>

        <div id='calcType-btns'>
          <input type='button' value='Correlation' onClick={(e) => { this.setCalcType('correlation'); this.changeScreen('Perform Calculation') }} />
          <input type='button' value='Regression' onClick={(e) => { this.setCalcType('regression'); this.changeScreen('Perform Calculation') }} />
        </div>
      </div>)
    } else if (displayScreen === 'Perform Calculation') {
      // inputXK used in this screen

      appScreen = (<div className='app-screen'>
        {inputXK}

        <input type='button' value='Perform Calculation' onClick={() => { this.performCalculation() }} />
      </div>)
    } else if (displayScreen === 'Display Results') {
      appScreen = (<div className='app-screen'>
        <h3>{this.state.calcType} calculated!</h3>

        <Results data={this.state.result} />
      </div>)
    } else if (displayScreen === 'Error') {
      appScreen = (<div className='app-screen'>
        <p id='error-message'>{this.state.result ? 'Calculation failed.' : ''} Error: {this.state.error}. Please reset calculator.</p>
      </div>)
    }

    // the actual code rendered to create the app. appScreen is determined in the chain of if statements above.
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Calculator - React</h1>
          <h2>Correlation + Regression</h2>
          <div id='top-buttons'>
            <input type='button' value='Reset Calculator' onClick={this.resetCalculator} />
            <InputModeBtn updateParent={this.updateInputMode} />
          </div>
        </header>

        {appScreen}

        <div className='data-display'>
          <DataTable dataArray={this.state.dataArrayOne} />
          <DataTable dataArray={this.state.dataArrayTwo} />
        </div>
      </div>
    )
  }
}

export default App
