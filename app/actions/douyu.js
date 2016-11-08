export const DOUYU_LIST = 'DOUYU_LIST';
export const DOUYU_REFRESH = 'DOUYU_REFRESH';
export const DOUYU_MORE = 'DOUYU_MORE';
export const SET_PLAYER = 'SET_PLAYER';

export function douyuList(){
	return (dispatch,getState)=>{
		const {douyu} = getState();
		if(douyu.status!=='nomore'){
			fetch('http://api.douyutv.com/api/v1/live/dota2?offset='+douyu.offset+'&limit='+douyu.limit)
			.then(response=>{
				response.json().then(responseData=>{
					if(responseData.data.length<20){
						douyu.status = 'nomore';
					}
					douyu.rooms = [...douyu.rooms,...responseData.data];
		      dispatch({
						type: DOUYU_LIST
					})
		    })
	    });
		}
	}
}

export function douyuRefresh(){
	return (dispatch,getState)=>{
		const {douyu} = getState();
		douyu.offset = 0;
		douyu.status = 'init';
		douyu.rooms = [];
		dispatch(douyuList());
	}
}

export function douyuMore(){
	return (dispatch,getState)=>{
		const {douyu} = getState();
		douyu.offset += douyu.limit;
		dispatch(douyuList());
	}
}

export function setPlayer(id,title){
	return (dispatch,getState)=>{
		const {liveplayer,douyu} = getState();
		fetch("http://m.douyu.com/html5/live?roomId="+id).then((response)=>{
			response.json().then((responseData)=>{
				liveplayer.room_id = id;
				liveplayer.title = title;
				liveplayer.hls_url = responseData.data.hls_url;
				liveplayer.platform = 'douyu';
				douyu.status = 'play';
				dispatch({
					type: SET_PLAYER
				})
	    });
    })
	}
}