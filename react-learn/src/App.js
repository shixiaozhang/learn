import {Component} from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter ,Link,Route} from 'react-router-dom'




class App extends Component{
  constructor(){
    super()
    this.state={
      name:'xiaozhang',
      date: new Date()
    }
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  changeName=(e)=>{
    console.log(e);
    this.setState({
      name:'小张'
    })
  }
  render(){

    return (
      <div>
      <div>{this.state.date.toLocaleTimeString()}</div>
      <App1 name={this.state.name} changeName={this.changeName}></App1>
      </div>
      
    )
  }
}


function App1(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={($event)=>{
            props.changeName($event)
          }}
        >
          Learn React {props.name}
        </p>
      </header>
    </div>
  );
}


export default App;
