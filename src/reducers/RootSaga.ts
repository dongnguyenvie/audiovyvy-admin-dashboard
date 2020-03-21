import { all, fork } from 'redux-saga/effects'
import { watchFetch } from './test/test.saga'

export default function* rootSaga() {
  yield all([
    fork(watchFetch),
    
  ])
}