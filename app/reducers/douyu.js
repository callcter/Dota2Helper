import { DOUYU_LIST,DOUYU_REFRESH,DOUYU_MORE,SET_PLAYER } from '../actions/douyu';

var initialState = {
	offset: 0,
	limit: 20,
	status: 'init',
	rooms: []
}

export default function douyu(state=initialState,action){
	switch(action.type){
		case DOUYU_LIST:
			return {
				...state
			}
		case DOUYU_REFRESH:
			return {
				...state
			}
		case DOUYU_MORE:
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