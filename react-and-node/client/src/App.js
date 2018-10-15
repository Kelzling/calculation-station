import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: null,
    calcType: null,
    dataArrayOne: [],
    dataArrayTwo: []
  };
  
  processInput (num) {
    console.log(num)
    let inputString = document.getElementById(`data-input-${num}`).value
    console.log(inputString)
    // do the string manipulation and stuff and things
    // don't forget to clear the data input box afterwards
  }
  
  resetCalculator () {
    // reset all attributes to default values
    console.log('this should reset the calculator eventually')
  }
  
  performCalculation (type) {
    // this one is going to need to talk to the express server to handle the calculations
    console.log(`should perform calculation of type ${type}`)
    this.setState({
      calcType: type
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
    return (
      <div className="App">
        <header className="App-header">
          <h1>Calculator</h1>
          <h2>Correlation + Regression</h2>
          <input type="button" value="Reset Calculator" onClick={this.resetCalculator} />
          <p className="App-intro">{this.state.data}</p>
        </header>
        
        <div className="app-screen">
          <p>Please enter your first lot of data, separated by commas</p>
          
          <div className="data-input-container">
            <input className="data-input" id="data-input-1" />
            <input type="button" className="data-submit" value="Submit Data" onClick={this.processInput.bind(this, 1)} />
          </div>
        </div>
        
        <div className="app-screen">
          <p>Please enter your second lot of data, which must be the same length as the first, separated by commas</p>
          
          <div className="data-input-container">
            <input className="data-input" id="data-input-2" />
            <input type="button" className="data-submit" value="Submit Data" onClick={this.processInput.bind(this, 2)} />
          </div>
        </div>
        
        <div className="app-screen">
          <p>Would you like to calculate the correlation or the regression of your data?</p>
          
          <div id="calcType-btns">
            <input type="button" value="Correlation" onClick={this.performCalculation.bind(this, 'correlation')} />
            <input type="button" value="Regression" onClick={this.performCalculation.bind(this, 'regression')} />
          </div>
        </div>
        
        <div className="app-screen">
          <h3>{this.state.calcType} calculated!</h3>
          
          <p>display results here</p>
        </div>
      </div>
    );
  }
}

export default App;
