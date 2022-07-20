import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.hydrate(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
)

