import { GET_USERINFO,HAS_LOGIN,SET_MATCHID,MATCHLIST } from '../actions/user';

var initialState = {
	account_id: 0,
	avatar: 'http://oalqimdk5.bkt.clouddn.com/1609165315339.jpg',
	nickname: '',
	getStatus: false,
	status: 'init'
}

export default function user(state = initialState, action){
	switch(action.type){
		case GET_USERINFO:
			return {
				...state
			}
		case HAS_LOGIN:
			return {
				...state
			}
		case SET_MATCHID:
			return {
				...state
			}
		case MATCHLIST:
			return {
				...state
			}
		default:
			return state;
	}
}