import { PANDA_LIST,PANDA_REFRESH,PANDA_MORE,SET_PLAYER } from '../actions/panda';

var initialState = {
	offset: 0,
	limit: 20,
	status: 'init',
	rooms: []
}

export default function panda(state=initialState,action){
	switch(action.type){
		case PANDA_LIST:
			return {
				...state
			}
		case PANDA_REFRESH:
			return {
				...state
			}
		case PANDA_MORE:
			return {
				...state
			}
		case SET_PLAYER:
			return {
				...state
			}
		default:
			return state
	}
}