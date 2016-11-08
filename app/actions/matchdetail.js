export const GET_MATCHDETAIL = 'GET_MATCHDETAIL';

export function getMatchdetail(){
	return (dispatch,getState)=>{
		var { matchdetail } = getState();
		fetch('http://dota.dreamser.com/apis/matchbyid',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				match_id: parseInt(matchdetail.match_id)
			})
		}).then(response=>{
			response.json().then(responseData=>{
				console.log(responseData);
				matchdetail.match_id = responseData.match_id;
				matchdetail.team_win = responseData.radiant_win;
				matchdetail.radiant_score = responseData.radiant_score;
				matchdetail.dire_score = responseData.dire_score;
				matchdetail.duration = responseData.duration;
				matchdetail.dataSource = matchdetail.dataSource.cloneWithRows(responseData.players);
				dispatch({
					type: GET_MATCHDETAIL
				});
			})
		});
	}
}