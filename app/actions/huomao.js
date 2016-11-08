export const HUOMAO_LIST = 'HUOMAO_LIST';
export const HUOMAO_REFRESH = 'HUOMAO_REFRESH';
export const HUOMAO_MORE = 'HUOMAO_MORE';
export const SET_PLAYER = 'SET_PLAYER';

export function huomaoList(){
	return (dispatch,getState)=>{
		const {huomao} = getState();
		if(huomao.status!=='nomore'){
			fetch('http://www.huomao.com/channels/channel.json?page=1&page_size=20&cache_time='+timestamp()+'&game_url_rule=dota2').then((response)=>{
				response.json().then(responseData=>{
					huomao.rooms = responseData.data.channelList;
					dispatch({
						type: HUOMAO_LIST
					})
		    })
	    })
		}
	}
}

export function huomaoRefresh(){
	return (dispatch,getState)=>{
		const {huomao} = getState();
		huomao.offset = 0;
		huomao.status = 'init';
		huomao.rooms = [];
		dispatch(huomaoList());
	}
}

export function huomaoMore(){
	return (dispatch,getState)=>{
		const {huomao} = getState();
		huomao.offset += huomao.limit;
		dispatch(huomaoList());
	}
}

export function setPlayer(id,title){
	return (dispatch,getState)=>{
		const {liveplayer,huomao} = getState();
		fetch('http://dreamser.com/Home/Live/huomao',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: 'http://www.huomao.com/mobile/mob_live?cid='+id
      })
    }).then((response)=>{
    	response.json().then((responseData)=>{
    		liveplayer.room_id = id;
    		liveplayer.title = title;
    		liveplayer.platform = 'huomao';
    		liveplayer.hls_url = 'http://live-ws-hls.huomaotv.cn/live/'+responseData.stream+'_720/playlist.m3u8';
    		huomao.status = 'play';
    		dispatch({
					type: SET_PLAYER
				})
	    })
    })
	}
}

function timestamp(){
  return Math.round(new Date().getTime()/1000);
}