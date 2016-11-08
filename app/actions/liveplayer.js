export const SET_QUALITY = 'SET_QUALITY';
export const SHOW_TOOLS = 'SHOW_TOOLS';
export const COLLECT_ROOM = 'COLLECT_ROOM';
export const REFRESH_URL = 'REFRESH_URL';
export const OUT_PLAYER = 'OUT_PLAYER';

export function setQuality(){
	return (dispatch,getState)=>{
		const { liveplayer } = getState();
		dispatch({
			type: SET_QUALITY
		})
	}
}

export function refreshUrl(){
	return (dispatch,getState)=>{
		const { liveplayer } = getState();
		fetch("http://m.douyu.com/html5/live?roomId="+liveplayer.room_id).then((response)=>{
			response.json().then((responseData)=>{
				liveplayer.hls_url = responseData.data.hls_url;
				dispatch({
					type: REFRESH_URL
				})
	    })
    })
	}
}

export function showTools(){
	return (dispatch,getState)=>{
		const { liveplayer } = getState();
		liveplayer.showNav = !liveplayer.showNav;
		dispatch({
			type: SHOW_TOOLS
		})
	}
}

export function outPlayer(){
	return (dispatch,getState)=>{
		const { liveplayer,douyu } = getState();
		liveplayer.showNav = false;
		if(liveplayer.platform==='douyu'){
			console.log(douyu.status);
		}
		dispatch({
			type: OUT_PLAYER
		})
	}
}

export function collectRoom(){
	return (dispatch,getState)=>{
		const { liveplayer } = getState();
		dispatch({
			type: COLLECT_ROOM
		})
	}
}