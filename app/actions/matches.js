export const GET_MATCHES = 'GET_MATCHES';

export function getMatches(){
	return (dispatch,getState) => {
		var { matches } = getState();
		if(matches.getStatus===true){
			fetch('http://dota.dreamser.com/matchlist',{
				method: 'POST',
	    	headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	      	account_id: matches.account_id,
	        offset: matches.offset,
	        limit: matches.limit
	      })
			})
			.then((response)=>response.json())
			.then((responseData)=>{
				if(responseData.result===true){
					if(responseData.data.length<10){
						matches.getStatus = false;
					}
					matches.start_from = responseData.data.matches[14].match_id;
					dispatch(receiveMatches([...matches.matches,...responseData.data.matches]));
				}
			})
		}
	}
}

export function refreshMatches(){
	return (dispatch,getState) => {
		var { matches } = getState();
		matches.offset = 0;
		matches.getStatus = true;
		matches.matches = [];
		dispatch(getMatches());
	}
}

export function moreMatches(){
	return (dispatch,getState) => {
		var { matches } = getState();
		matches.offset = matches.start_from-1;
		dispatch(getMatches());
	}
}

function receiveMatches(ret) {
	return {
		type: GET_MATCHES,
		matches: ret
	}
}