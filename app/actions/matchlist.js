export const GET_MATCHES = 'GET_MATCHES';
export const SET_MATCHID = 'SET_MATCHID';

export function getMatches(){
	return (dispatch,getState) => {
		var { matchlist,userinfo } = getState();
		if(matchlist.getStatus===true){
			fetch('http://dota.dreamser.com/matchlist',{
				method: 'POST',
	    	headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	      	account_id: userinfo.account_id,
	        offset: matchlist.offset,
	        limit: matchlist.limit
	      })
			})
			.then((response)=>{
				response.json().then((responseData)=>{
					if(responseData.result===true){
						if(responseData.data.length<10){
							matchlist.getStatus = false;
						}
						matchlist.start_from = responseData.data.matches[14].match_id;
						matchlist.matches = [...matchlist.matches,...responseData.data.matches];
						dispatch({
							type: GET_MATCHES
						});
					}
				})
			});
		}
	}
}
export function refreshMatches(){
	return (dispatch,getState) => {
		var { matchlist } = getState();
		matchlist.offset = 0;
		matchlist.getStatus = true;
		matchlist.matches = [];
		dispatch(getMatches());
	}
}
export function moreMatches(){
	return (dispatch,getState) => {
		var { matchlist } = getState();
		matchlist.offset = matchlist.start_from-1;
		dispatch(getMatches());
	}
}
export function setMatchid(match_id){
	return (dispatch,getState)=>{
		var { matchdetail } = getState();
		console.log(getState());
		matchdetail.match_id = match_id;
		dispatch({
			type: SET_MATCHID
		});
	}
}