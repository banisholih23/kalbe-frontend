import React, {Component} from 'react'
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {store, persistor} from './redux/store'

import Login from './page/Login'
import Register from './page/Register'
import Dashboard from './page/Dashboard'

class App extends Component {
  render(){
    return(
      <>
        <Provider store={store}>
          <HashRouter>
            <PersistGate persistor={persistor}>
              <Switch>
                <Route path='/' exact component={Login}/>
                <Route path='/register' exact component={Register}/>
                <Route path='/dashboard' exact component={Dashboard}/>
              </Switch>
            </PersistGate>
          </HashRouter>
        </Provider>
      </>
    )
  }
}

export default App