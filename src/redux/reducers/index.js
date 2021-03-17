import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import user from './user'
import login from './login'
import product from './product'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  debug: false,
  // whitelist: ['login, book']
}

const reducer = combineReducers({
  user,
  login,
  product
})

export default persistReducer(persistConfig, reducer)