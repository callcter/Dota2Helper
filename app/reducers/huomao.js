import { HUOMAO_LIST,HUOMAO_REFRESH,HUOMAO_MORE,SET_PLAYER } from '../actions/huomao';

var initialState = {
	offset: 0,
	limit: 20,
	status: 'init',
	rooms: []
}

export default function huomao(state=initialState,action){
	switch(action.type){
		case HUOMAO_LIST:
			return {
				...state
			}
		case HUOMAO_REFRESH:
			return {
				...state
			}
		case HUOMAO_MORE:
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