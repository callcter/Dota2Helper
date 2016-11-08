import { SET_MATCHID } from '../actions/search';

var initialState = {
	match_id: 0,
	status: 'init'
}

export default function search(state=initialState,action){
	switch(action.type){
		case SET_MATCHID:
			return {
				...state
			}
		default:
			return state
	}
}