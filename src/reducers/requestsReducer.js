import {
	GET_REQUESTS_REQUEST,
	GET_REQUESTS_SUCCESS,
	GET_REQUESTS_FAILURE,
	ADD_REQUEST_REQUEST,
	ADD_REQUEST_SUCCESS,
	ADD_REQUEST_FAILURE,
} from 'constants/index';

const initialState = {
	requests: [],
	isFetching: false,
	error: null,
};

export const requestsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REQUESTS_REQUEST:
		case ADD_REQUEST_REQUEST:
			return { ...state, isFetching: true };
		case GET_REQUESTS_SUCCESS:
			return { ...state, requests: action.payload, isFetching: false };
		case GET_REQUESTS_FAILURE:
		case ADD_REQUEST_FAILURE:
			return { ...state, isFetching: false, error: action.payload };
		case ADD_REQUEST_SUCCESS:
			return {
				...state,
				requests: [...state.requests, action.payload],
				isFetching: false,
			};
		default:
			return state;
	}
};
