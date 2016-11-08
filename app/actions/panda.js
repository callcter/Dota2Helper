export const PANDA_LIST = 'PANDA_LIST';
export const PANDA_REFRESH = 'PANDA_REFRESH';
export const PANDA_MORE = 'PANDA_MORE';
export const SET_PLAYER = 'SET_PLAYER';

export function pandaList(){
	return (dispatch,getState)=>{
		const {panda} = getState();
		if(panda.status!=='nomore'){
			fetch('http://api.m.panda.tv/ajax_get_live_list_by_cate?cate=dota2&pageno=1&pagenum=20').then((response)=>{
				response.json().then((responseData)=>{
					panda.rooms = responseData.data.items;
					dispatch({
						type: PANDA_LIST
					})
		    })
			})
		}
	}
}

export function pandaRefresh(){
	return (dispatch,getState)=>{
		const {panda} = getState();
		panda.offset = 0;
		panda.status = 'init';
		panda.rooms = [];
		dispatch(pandaList());
	}
}

export function pandaMore(){
	return (dispatch,getState)=>{
		const {panda} = getState();
		panda.offset += panda.limit;
		dispatch(pandaList());
	}
}

export function setPlayer(id,title){
	return (dispatch,getState)=>{
		const {liveplayer,panda} = getState();
		fetch('http://room.api.m.panda.tv/index.php?method=room.shareapi&roomid='+id).then((response)=>{
			response.json().then(responseData=>{
				liveplayer.room_id = id;
				liveplayer.title = title;
				liveplayer.hls_url = responseData.data.videoinfo.address.split('_small')[0]+'_mid.m3u8';
				liveplayer.platform = 'panda';
				douyu.status = 'play';
				dispatch({
					type: SET_PLAYER
				})
	    })
    })
	}
}