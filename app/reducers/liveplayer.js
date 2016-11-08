import { SET_QUALITY,REFRESH_URL,OUT_PLAYER,SHOW_TOOLS } from '../actions/liveplayer';

const initialState = {
	quality: 'normal',
	platform: '',
	hls_url: '',
	room_id: '',
	title: '',
	showNav: false
}

export default function liveplayer(state=initialState,action){
	switch(action.type){
		case SET_QUALITY:
			return {
				...state
			}
		case REFRESH_URL:
			return {
				...state
			}
		case OUT_PLAYER:
			return {
				...state
			}
		case SHOW_TOOLS:
			return {
				...state
			}
		default:
			return state
	}
}