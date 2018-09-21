import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { rootSaga } from 'sagas/rootSaga';
import { requestsReducer } from 'reducers/requestsReducer';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
	requestsReducer,
	applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);
