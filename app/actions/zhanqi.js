export const ZHANQI_LIST = 'ZHANQI_LIST';
export const ZHANQI_REFRESH = 'ZHANQI_REFRESH';
export const ZHANQI_MORE = 'ZHANQI_MORE';
export const SET_PLAYER = 'SET_PLAYER';

export function zhanqiList(){
	return (dispatch,getState)=>{
		const {zhanqi} = getState();
		if(zhanqi.status!=='nomore'){
			fetch('http://www.zhanqi.tv/api/static/game.lives/10/20-1.json').then((response)=>{
				response.json().then((responseData)=>{
					if(responseData.data.rooms.length<20){
						zhanqi.status = 'nomore';
					}
					zhanqi.rooms = [...zhanqi.rooms,...responseData.data.rooms];
					dispatch({
						type: ZHANQI_LIST
					})
		    })
			})
		}
	}
}

export function zhanqiRefresh(){
	return (dispatch,getState)=>{
		const {zhanqi} = getState();
		zhanqi.offset = 0;
		zhanqi.status = 'init';
		zhanqi.rooms = [];
		dispatch(zhanqiList());
	}
}

export function zhanqiMore(){
	return (dispatch,getState)=>{
		const {zhanqi} = getState();
		zhanqi.offset += zhanqi.limit;
		dispatch(zhanqiList());
	}
}

export function setPlayer(id,title){
	return (dispatch,getState)=>{
		const {liveplayer,zhanqi} = getState();
		liveplayer.room_id = id;
		liveplayer.title = title;
		liveplayer.hls_url = 'http://dlhls.cdn.zhanqi.tv/zqlive/'+liveplayer.room_id+'_1024.m3u8';
		liveplayer.platform = 'zhanqi';
		zhanqi.status = 'play';
		dispatch({
			type: SET_PLAYER
		})
	}
}