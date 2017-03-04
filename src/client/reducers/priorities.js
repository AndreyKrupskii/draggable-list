const initialState = {
	dictionary: [],
	loaded: false
}

export default function listReduser(state = initialState, action){
	switch(action.type) {
		case 'SET_PRIORITY' : {
			const dictionary = [...state.dictionary];
			dictionary[action.payload.position] = action.payload;

			return {
				...state,
				dictionary
			}
		}
		case 'DELETE_PRIORITY' : {
			const dictionary = [...state.dictionary];
			
			dictionary.splice(action.payload, 1);
			

			return {
				...state,
				dictionary: dictionary.map((priority, index) => {
					return {
						...priority,
						position: index
					}
				})
			}
		}
		
		case 'SET_SORTED_PRIORITY' : {
			return {
				...state,
				dictionary: action.payload.map((priority, index) => {
					return {
						...priority,
						position: index
					}
				})
			}
		}
		
		case 'GET_REQUEST_SUCCSES' : {
			return {
				...state,
				dictionary: action.payload,
				loaded: true
			}
		}
		default : {
			return state;
		}
	}
}