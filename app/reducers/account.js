import { BIND_ACCOUNT } from '../actions/account';

var initialState = {
	account_id: 0,
	status: 'init'
}

export default function account(state=initialState,action){
	switch(action.type){
		case BIND_ACCOUNT:
			return {
				...state
			}
		default:
			return state
	}
}