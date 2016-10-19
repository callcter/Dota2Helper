export const GET_USERINFO = 'GET_USERINFO';
export const SET_ACCOUNT = 'SETACCOUNT';
export const HAS_LOGIN = 'HAS_LOGIN';
export const SET_MATCHID = 'SET_MATCHID';

export function getUserinfo(){
	return (dispatch,getState) => {
		var { userinfo } = getState();
		fetch('http://dota.dreamser.com/listofaccount',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				steam_id: parseInt(userinfo.account_id)
			})
		}).then((response)=>{
			response.json().then(responseData=>{
				userinfo.hasAccount = true;
				userinfo.avatar = responseData.response.players[0].avatarmedium;
				userinfo.nickname = responseData.response.players[0].personaname;
				dispatch({
					type: GET_USERINFO
				});
			})
		});
	}
}

export function setAccount(aid){
	return (dispatch,getState) => {
		var { userinfo } = getState();
		userinfo.account_id = parseInt(aid);
		userinfo.hasAccount = true;
		storage.save({
  		key: 'account',
  		rawData: {
  			accountId: parseInt(aid)
  		},
  		expires: null
  	}).then(()=>{
  		console.log(storage);
  		dispatch(getUserinfo());
  	});
	}
}

export function hasLogin(){
	return (dispatch,getState) => {
		var { userinfo } = getState();
		storage.load({
			key: 'account'
		}).then(ret=>{
			if(ret.accountId){
				userinfo.account_id = parseInt(ret.accountId);
				userinfo.hasAccount = true;
				dispatch(getUserinfo());
			}else{
				userinfo.hasAccount = false;
				dispatch({
					type: HAS_LOGIN
				});
			}
		}).catch(err=>{
			console.log(err);
			userinfo.hasAccount = false;
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