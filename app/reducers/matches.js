import { GET_MATCHES } from '../actions/matches';

var initialState = {
	offset: 0,
	limit: 15,
	account_id: 197301278,
	getStatus: true,
	matches: [],
	start_from: 0
}

export default function matches(state=initialState,action){
	switch(action.type){
		case GET_MATCHES:
			return Object.assign({},state,{
				matches: action.matches
			})
		default:
			return state;
	}
}