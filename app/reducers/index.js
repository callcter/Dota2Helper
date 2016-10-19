import { combineReducers } from 'redux';
import matchlist from './matchlist';
import userinfo from './userinfo';
import matchdetail from './matchdetail';

const rootReducer = combineReducers({
	matchlist,
	userinfo,
	matchdetail
});

export default rootReducer;