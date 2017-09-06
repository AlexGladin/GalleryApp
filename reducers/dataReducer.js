import { 
	FETCHING_DATA, 
	FETCHING_DATA_SUCCESS, 
	FETCHING_DATA_FAILURE } from '../constants';

const initialState = {
	data: [],
	dataFetched: false,
	isFetching: false,
	error: false,
	currentPage: 1,
	totalPages: 10
};

export default function dataReducer(state = initialState, action) {
	console.log('Action', action.type);
	
	switch (action.type) {
    	case FETCHING_DATA:
			return {
				...state,
				data: [],
				isFetching: true
			}
    	case FETCHING_DATA_SUCCESS:
			return {
				...state,
				isFetching: false,
				dataFetched: true,
				data: action.data,
				totalPages: action.totalPages
			}
			case FETCHING_DATA_FAILURE:
				return {
					...state,
					isFetching: false,
					error: true
				}
			default:
				return state
	}
}
