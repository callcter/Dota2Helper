import { SET_PLAYER } from '../actions/didi';

var initialState = {
	status: 'init'
}

export default function didi(state=initialState,action){
	switch(action.type){
		case SET_PLAYER:
			return {
				...state
			}
		default:
			return state;
	}
}