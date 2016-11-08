export const GET_USER = 'GET_USER';
export const HAS_LOGIN = 'HAS_LOGIN';
export const SET_MATCHID = 'SET_MATCHID';
export const MATCHLIST = 'MATCHLIST';

export function getUser(){
	return (dispatch,getState) => {
		console.log(getState());
		var { user,account } = getState();
		fetch('http://dota.dreamser.com/apis/listofaccount',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				steam_id: parseInt(account.account_id)
			})
		}).then((response)=>{
			response.json().then(responseData=>{
				user.status = 'done';
				user.avatar = responseData.response.players[0].avatarmedium;
				user.nickname = responseData.response.players[0].personaname;
				dispatch({
					type: GET_USER
				});
			})
		});
	}
}

export function hasLogin(){
	return (dispatch,getState) => {
		var { user,account } = getState();
		storage.load({
			key: 'account'
		}).then(ret=>{
			if(ret.accountId){
				user.account_id = parseInt(ret.accountId);
				account.account_id = parseInt(ret.accountId);
				dispatch(getUser());
			}else{
				user.status = 'doing';
				dispatch({
					type: HAS_LOGIN
				});
			}
		}).catch(err=>{
			console.log(err);
			user.status = 'doing';
			dispatch({
				type: HAS_LOGIN
			});
		});
	}
}

export function setMatchid(match_id){
	return (dispatch,getState)=>{
		var { matchdetail } = getState();
		matchdetail.match_id = match_id;
		dispatch({
			type: SET_MATCHID
		});
	}
}

export function matchList(){
	return (dispatch,getState)=>{
		console.log(Actions);
		Actions.matchlist;
		dispatch({
			type: MATCHLIST
		});
	}
}