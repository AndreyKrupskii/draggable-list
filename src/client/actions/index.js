import store from 'store';
import fetch from 'isomorphic-fetch';

export function setPriority(priority){
	return {
		type: 'SET_PRIORITY',
		payload: priority
	}
}

export function deletePriority(position){
	return {
		type: 'DELETE_PRIORITY',
		payload: position
	}
}

export function setSorted(sorted){
	return {
		type: 'SET_SORTED_PRIORITY',
		payload: sorted
	}
}


export function getRequest(){
	return (dispatch) => {
		dispatch({
			type: 'GET_REQUEST'
		})

		const config = {
			method: 'GET',
			headers: { 'Content-Type':'application/json' },
			mode: 'cors',
			credentials: 'include'
		}

		fetch('/api/dictionary', config)
			.then((response) => {
				if(response.status !== 200) {
					throw new Error();
				} else {
					return response.json();
				}
			})
			.then((payload) => {
				dispatch({
					type: 'GET_REQUEST_SUCCSES',
					payload: payload.data
				})
			})
			.catch((error) => {
				console.error(error);
				dispatch({
					type: 'GET_REQUEST_FAIL',
					payload: error
				})
			})
	}
}

export function saveRequest(){
	return (dispatch) => {
		dispatch({
			type: 'SAVE_REQUEST'
		})

		const { dictionary } = store.getState().priorities;
		const config = {
			method: 'POST',
			headers: { 'Content-Type':'application/json' },
			mode: 'cors',
			body: JSON.stringify({data: dictionary}),
			credentials: 'include'
		}

		fetch('/api/dictionary', config)
			.then((response) => {
				if(response.status !== 200) {
					throw new Error();
				} else {
					return response.json();
				}
			})
			.then((payload) => {
				dispatch({
					type: 'SAVE_REQUEST_SUCCSES',
					payload: payload.data
				})
			})
			.catch((error) => {
				console.error(error);
				dispatch({
					type: 'SAVE_REQUEST_FAIL',
					payload: error
				})
			})
	}
}