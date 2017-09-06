import { 
	FETCHING_DATA, 
	FETCHING_DATA_SUCCESS, 
	FETCHING_DATA_FAILURE } from './constants';
import api from './api';

export function getData() {
	return {
		type: FETCHING_DATA
	}
}

export function getDataSuccess(data, totalPages) {
	return {
    	type: FETCHING_DATA_SUCCESS,
    	data,
    	totalPages
  	}
}

export function getDataFailure() {
	return {
		type: FETCHING_DATA_FAILURE
	}
}

export function fetchData(currentPage = 1) {
	return (dispatch) => {
		dispatch(getData());
		
		api(currentPage)
			.then((resp) => {
				if (resp.ok) return resp.json();
				else throw new Error('Network request failed');
			})
			.then((respJson) => {
				if (respJson.photos && respJson.photos.length)
					dispatch(getDataSuccess(respJson.photos, respJson.total_pages));
				else throw new Error('Invalid data');
			})
		.catch((e) => dispatch(getDataFailure()));
	}
}