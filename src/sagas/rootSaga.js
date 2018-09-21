import { call, put, take, fork, all } from 'redux-saga/effects';
import axios from 'axios';
import {
	API_URL,
	GET_REQUESTS_REQUEST,
	GET_REQUESTS_SUCCESS,
	GET_REQUESTS_FAILURE,
	ADD_REQUEST_REQUEST,
	ADD_REQUEST_SUCCESS,
	ADD_REQUEST_FAILURE,
} from 'constants/index';

function* handleGetRequests() {
	try {
		const payload = yield call(() => {
			return axios.get(`${API_URL}/requests`);
		});
		yield put({ type: GET_REQUESTS_SUCCESS, payload: payload.data });
	} catch (error) {
		const payload = error.message || 'unknown error';
		yield put({ type: GET_REQUESTS_FAILURE, payload });
	}
}

function* handleAddRequest(data) {
	try {
		const payload = yield call(() => {
			return axios.post(`${API_URL}/requests`, { ...data });
		});
		yield put({ type: ADD_REQUEST_SUCCESS, payload: payload.data });
	} catch (error) {
		const payload = error.message || 'unknown error';
		yield put({ type: ADD_REQUEST_FAILURE, payload });
	}
}

function* watchGetRequests() {
	while (yield take(GET_REQUESTS_REQUEST)) {
		yield call(handleGetRequests);
	}
}

function* watchAddRequest() {
	while (true) {
		const { payload } = yield take(ADD_REQUEST_REQUEST);
		yield call(handleAddRequest, payload);
	}
}

export function* rootSaga() {
	yield all([fork(watchGetRequests), fork(watchAddRequest)]);
}
