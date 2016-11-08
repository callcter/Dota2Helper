export const BIND_ACCOUNT = 'BIND_ACCOUNT';

export function bindAccount(aid){
	return (dispatch,getState) => {
		var { account,user } = getState();
    account.account_id = parseInt(aid);
		user.account_id = parseInt(aid);
		storage.save({
  		key: 'account',
  		rawData: {
  			accountId: parseInt(aid)
  		},
  		expires: null
  	}).then(()=>{
  		account.status = 'done';
  		user.status = 'do';
  		dispatch({
  			type: BIND_ACCOUNT
  		});
  	});
	}
}