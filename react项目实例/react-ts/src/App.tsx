import React from 'react';
import './App.less';
import './tet.less'
import logo from './logo.svg'

import Other from './components/other'




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>


      <Other {...{
        message: 'string',
        count: 0,
        disabled: false,
        names: ['1111'],
        status: "waiting"
      }} />
    </div>
  );
}





export default App;
