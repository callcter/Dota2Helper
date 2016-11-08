import { ActionConst } from 'react-native-router-flux';

const initialState = {
	scene: {}
}

export default function routes(state=initialState,action){
	switch (action.type){
		case ActionConst.FOCUS:
			return {
				...state,
				scene: action.scene
			}
		case ActionConst.PUSH:
			return {
				...state,
				scene: action.scene
			}
		default:
			return state;
	}
}