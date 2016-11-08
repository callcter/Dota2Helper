export const SET_PLAYER = 'SET_PLAYER';
export const SET_READER = 'SET_READER';

export function setPlayer(aid){
	return (dispatch,getState) => {
		const { didi,videoplayer } = getState();
		fetch('http://api.bilibili.com/playurl?aid='+aid).then((response)=>{
			response.json().then((responseData)=>{
				console.log(responseData.durl[0]);
				videoplayer.uri = responseData.durl[0].url;
				videoplayer.img = responseData.img;
				didi.status = 'playvideo';
				dispatch({
					type: SET_PLAYER
				});
			});
		});
	}
}

// export function setPlayer(url){
// 	return (dispatch,getState)=>{
// 		const { videoplayer,didi } = getState();
// 		videoplayer.uri = url;
// 		didi.status = 'playvideo';
// 		dispatch({
// 			type: SET_PLAYER
// 		})
// 	}
// }

export function setReader(){}