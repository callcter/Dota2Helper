import { GET_MATCHDETAIL } from '../actions/matchdetail';
import { ListView } from 'react-native';

const initialState = {
	match_id: '',
	team_win: '',
	radiant_score: '',
	dire_score: '',
	duration: '',
	dataSource: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2})
}

export default function matchdetail(state=initialState,action){
	switch(action.type){
		case GET_MATCHDETAIL:
			return {
				...state
			}
		default:
			return state;
	}
}