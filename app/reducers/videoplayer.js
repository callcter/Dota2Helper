import { OUT_PLAYER } from '../actions/videoplayer';

const initialState = {
	uri: '',
	img: ''
}

export default function videoplayer(state=initialState,action){
	switch(action.type){
		case OUT_PLAYER:
			return {
				...state
			}
		default:
			return state
	}
}