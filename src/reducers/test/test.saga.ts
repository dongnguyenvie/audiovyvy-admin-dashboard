import { put, takeEvery, fork, delay } from 'redux-saga/effects'
import { IGetTestState } from '../../actions/IActions'
import ActionTypeKeys from '../../actions/ActionTypeKey'
import { ITestState } from '../../models/ITestState'

export function* watchFetch() {
  yield takeEvery(ActionTypeKeys.FETCH_TEST_STATE, fetchText)
}

export function* fetchText() {
  try {
    const rs = yield fetch(`https://baconipsum.com/api/?type=all-meat&paras=3&start-with-lorem=1&format=text`)
    const rawData = yield rs.text()
    const data = { username: 'dong.nguyen', password: 'test.nguyen' }
    yield put(successFetch(data))
    // yield fork(changeStatus, { ...data, isLoading: false })
  } catch (err) {
    const data = { username: 'dong.nguyen', password: 'test.nguyen' }
    yield put(successFetch(data))
  }
}

const successFetch = (payload: ITestState): IGetTestState => ({
  type: ActionTypeKeys.GET_TEST_STATE,
  payload
})
