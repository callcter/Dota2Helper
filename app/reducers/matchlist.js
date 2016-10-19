import { GET_MATCHES,SET_MATCHID } from '../actions/matchlist';

var initialState = {
	offset: 0,
	limit: 15,
	account_id: 0,
	getStatus: true,
	matches: [],
	start_from: 0
}

export default function matchlist(state=initialState,action){
	switch(action.type){
		case GET_MATCHES:
			return {
				...state
			}
		case SET_MATCHID:
			return {
				...state
			}
		default:
			return state;
	}
}