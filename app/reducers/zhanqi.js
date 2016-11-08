import { ZHANQI_LIST,ZHANQI_REFRESH,ZHANQI_MORE,SET_PLAYER } from '../actions/zhanqi';

var initialState = {
	offset: 0,
	limit: 20,
	status: 'init',
	rooms: []
}

export default function zhanqi(state=initialState,action){
	switch(action.type){
		case ZHANQI_LIST:
			return {
				...state
			}
		case ZHANQI_REFRESH:
			return {
				...state
			}
		case ZHANQI_MORE:
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