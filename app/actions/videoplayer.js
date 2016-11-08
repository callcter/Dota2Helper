export const OUT_PLAYER = 'OUT_PLAYER';

export function outPlayer(){
	return (dispatch,getState)=>{
		const { videoplayer,didi } = getState();
		didi.status = 'init';
		dispatch({
			type: OUT_PLAYER
		})
	}
}