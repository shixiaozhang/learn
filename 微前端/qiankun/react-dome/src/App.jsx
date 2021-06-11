import { Provider } from 'react-redux'
import store from './store'
import Router from './router'
import './style/App.css'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
