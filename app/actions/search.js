export const SET_MATCHID = 'SET_MATCHID';

export function setMatchid(mid){
	return (dispatch,getState)=>{
		var { search,matchdetail } = getState();
		search.match_id = parseInt(mid);
		matchdetail.match_id = parseInt(mid);
		search.status = 'done';
		dispatch({
			type: SET_MATCHID
		})
	}
}