import { GET_USERINFO,SET_ACCOUNT,HAS_LOGIN,SET_MATCHID } from '../actions/userinfo';

var initialState = {
	account_id: 0,
	avatar: 'http://oalqimdk5.bkt.clouddn.com/1609165315339.jpg',
	nickname: '',
	getStatus: false,
	hasAccount: true
}

export default function userinfo(state = initialState, action){
	switch(action.type){
		case GET_USERINFO:
			return {
				...state
			}
		case SET_ACCOUNT:
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
		default:
			return state;
	}
}