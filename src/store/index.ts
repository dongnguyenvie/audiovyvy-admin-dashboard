import { applyMiddleware, createStore, Store } from 'redux'
import createSagaMiddlewre from 'redux-saga'
import rootReducer from '../reducers/RootReducer'
import rootSaga from '../reducers/RootSaga'

const sagaMiddleware = createSagaMiddlewre()

export default createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)
