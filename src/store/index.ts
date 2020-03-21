import { applyMiddleware, createStore, Store } from 'redux'
import createSagaMiddlewre from 'redux-saga'
import rootReducer from '../reducers/RootReducer'
import rootSaga from '../reducers/RootSaga'

const sagaMiddleware = createSagaMiddlewre()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
export default store
sagaMiddleware.run(rootSaga)
