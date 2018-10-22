import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import CorrelationCalculator from './CorrelationCalculator.js'
import RegressionCalculator from './RegressionCalculator.js'

class ResultsItem extends Component {
  render() {
    return (<li>{this.props.result[0]}: {this.props.result[1]}</li>)
  }
}

class Results extends Component {
  render () {
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
  constructor (props) {
    super(props)
    this.state = {
      inputMode: 'text'
    }
    
    this.toggleInputMode = this.toggleInputMode.bind(this)
  }
  
  toggleInputMode () {
    let newMode = (this.state.inputMode === 'text') ? 'file' : 'text'
    this.setState({
      inputMode: newMode
    })
    this.props.updateParent(newMode)
  }
  
  render() {
    return (<button onClick={(e) => { this.toggleInputMode() }}>Switch to {this.state.inputMode === 'text' ? 'file' : 'text'} input</button>)
  }
}

class TextInput extends Component {
  constructor (props) {
    super(props)
    
    this.handleEnterKey = this.handleEnterKey.bind(this)
  }
  
  handleEnterKey (e) {
    if (e.key === 'Enter') {
      this.props.handleEnter(e)
    }
  }
  
  componentDidMount () {
    ReactDOM.findDOMNode(this).addEventListener("keydown", this.handleEnterKey)
  }
  
  componentWillUnmount() {
    ReactDOM.findDOMNode(this).removeEventListener("keydown", this.handleEnterKey)
  }
  
  render () {
    return (<input id={this.props.id} className="data-input" />)
  } // onKeyDown={(e) => {this.handleEnterKey.bind(this, e)}} - for some reason this wouldn't attach the event handler correctly even though what I read suggested it should
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      calcType: null,
      dataArrayOne: [],
      dataArrayTwo: [],
      corrCalc: new CorrelationCalculator(),
      regrCalc: new RegressionCalculator(),
      result: {},
      displayScreen: 'Data Entry 1',
      inputMode: 'text'
    }
    this.validScreens = ['Data Entry 1', 'Data Entry 2', 'Choose Calculation', 'Display Results']
    
    console.log(this.state)
    
    this.processInput = this.processInput.bind(this)
    this.performCalculation = this.performCalculation.bind(this)
    this.resetCalculator = this.resetCalculator.bind(this)
    this.changeScreen = this.changeScreen.bind(this)
    this.updateInputMode = this.updateInputMode.bind(this)
  }
  
  updateInputMode (newMode) {
    this.setState({
      inputMode: newMode
    })
  }
  
  handleFileInput (arrayNum, e) {
    let reader = new FileReader()
    reader.onload = (e) => {
      let inputString = e.target.result
      this.processInput(inputString, arrayNum)
    }
    reader.readAsText(e.target.files[0])
  }
  
  handleTextInput (arrayNum, e) {
    let input = document.getElementById(`data-input-${arrayNum}`)
    let inputString = input.value
    input.value = ''
    this.processInput(inputString, arrayNum)
  }
  
  processInput (inputString, arrayNum) {
    let delimiter = (this.state.inputMode === 'text') ? ',' : '\r\n'
    let splitString = inputString.split(delimiter)
    let outputArray = []
    splitString.forEach(aString => {
      let aNum = Number(aString.trim())
      if (!isNaN(aNum)) {
        outputArray.push(aNum)
      } else {
        console.log("Couldn't process input")
      }
    })
    if (arrayNum === 1) {
      this.setState({ dataArrayOne: outputArray })
    } else if (arrayNum === 2) {
      this.setState({ dataArrayTwo: outputArray })
    }
  }
  
  resetCalculator () {
    this.setState({
      calcType: null,
      dataArrayOne: [],
      dataArrayTwo: [],
      result: {},
      displayScreen: 'Data Entry 1'
    })
  }
  
  changeScreen (newScreen) {
    if (this.validScreens.includes(newScreen)) {
      this.setState({ displayScreen: newScreen })
    } else {
      console.warn('Change Screen Failed: Screen Was Not Valid')
    }
  }
  
  performCalculation (type) {
    // this one is going to need to talk to the express server to handle the calculations
    this.setState({
      calcType: type
    }) // note to self, setState asynchronous in event handler, so couldn't rely on using state.calcType for these comparisons.
    let newResult
    if (type === 'correlation') {
      newResult = this.state.corrCalc.runCalculator(this.state.dataArrayOne, this.state.dataArrayTwo)
    } else if (type === 'regression') {
      newResult = this.state.regrCalc.runCalculator(this.state.dataArrayOne, this.state.dataArrayTwo)
    }
    this.setState({
      result: newResult
    })
  }

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
  };
  
  render() {
    const displayScreen = this.state.displayScreen
    const inputMode = this.state.inputMode
    let appScreen
    
    if (displayScreen === 'Data Entry 1' && inputMode === 'text') {
      appScreen = (<div className="app-screen">
        <p>Please enter your first lot of data, separated by commas</p>

        <div className="data-input-container">
          <TextInput id="data-input-1" handleEnter={(e) => { this.handleTextInput(1, e); this.changeScreen('Data Entry 2')} } />
          <input type="button" className="data-submit" value="Submit Data" onClick={(e) => {this.handleTextInput(1, e); this.changeScreen('Data Entry 2')}} />
        </div>
      </div>)
    } else if (displayScreen === 'Data Entry 1' && inputMode === 'file') {
      appScreen = (<div className="app-screen">
        <p>Please load your first data file. Each data item should be on a new line.</p>
        
        <input type="file" onChange={(e) => {this.handleFileInput(1, e); this.changeScreen('Data Entry 2')}} />
      </div>)
    } else if (displayScreen === 'Data Entry 2' && inputMode === 'text') {
      appScreen = (<div className="app-screen">
        <p>Please enter your second lot of data, which must be the same length as the first, separated by commas</p>
        
        <div className="data-input-container">
          <TextInput id="data-input-2" handleEnter={(e) => { this.handleTextInput(2, e); this.changeScreen('Choose Calculation')} } />
          <input type="button" className="data-submit" value="Submit Data" onClick={(e) => {this.handleTextInput(2, e); this.changeScreen('Choose Calculation')}} />
        </div>
      </div>)
    } else if (displayScreen === 'Data Entry 2' && inputMode === 'file') {
      appScreen = (<div className="app-screen">
        <p>Please load your second data file. Please ensure both files have the same amount of numbers.</p>
        
        <input type="file" onChange={(e) => {this.handleFileInput(2, e); this.changeScreen('Choose Calculation')}} />
      </div>)
    } else if (displayScreen === 'Choose Calculation') {
      appScreen = (<div className="app-screen">
        <p>Would you like to calculate the correlation or the regression of your data?</p>
          
        <div id="calcType-btns">
          <input type="button" value="Correlation" onClick={(e) => { this.performCalculation('correlation'); this.changeScreen('Display Results')}} />
          <input type="button" value="Regression" onClick={(e) => {this.performCalculation('regression'); this.changeScreen('Display Results')}} />
        </div>
      </div>)
    } else if (displayScreen === 'Display Results') {
      appScreen = (<div className="app-screen">
        <h3>{this.state.calcType} calculated!</h3>
        
        <Results data={this.state.result} />
        </div>)
    }
    
    return (
      <div className="App">
        <header className="App-header">
          <h1>Calculator</h1>
          <h2>Correlation + Regression</h2>
          <div id="top-buttons">
            <input type="button" value="Reset Calculator" onClick={this.resetCalculator} />
            <InputModeBtn updateParent={this.updateInputMode} />
          </div>
          <p className="App-intro">{this.state.data}</p>
        </header>
        
        {appScreen}
        
        <div className="data-display">
          <DataTable dataArray={this.state.dataArrayOne} />
          <DataTable dataArray={this.state.dataArrayTwo} />
        </div>
      </div>
    );
  }
}

export default App;
