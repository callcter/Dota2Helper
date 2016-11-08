import { combineReducers } from 'redux';
import matchlist from './matchlist';
import user from './user';
import matchdetail from './matchdetail';
import didi from './didi';
import routes from './routes';
import account from './account';
import search from './search';
import liveplayer from './liveplayer';
import douyu from './douyu';
import huomao from './huomao';
import zhanqi from './zhanqi';
import panda from './panda';
import videoplayer from './videoplayer';

const rootReducer = combineReducers({
	matchlist,
	user,
	matchdetail,
	didi,
	routes,
	account,
	search,
	liveplayer,
	douyu,
	zhanqi,
	huomao,
	panda,
	videoplayer
});

export default rootReducer;