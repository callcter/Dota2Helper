import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import * as AccountActions from '../actions/account';
import Style from '../styles/style';

class Account extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	account_id: 0
	  }
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.status==='done'){
			Actions.pop();
			return false;
		}
		return true;
	}
	render() {
		const { bindAccount } = this.props;
		return(
			<View style={Style.container}>
				<View style={Style.modal_back}>
					<View style={Style.modal_box}>
						<View style={Style.labelBox_sign}>
	            <Text style={Style.label_sign}>
	              Steam ID
	            </Text>
	            <View style={Style.inputBox_sign}>
	              <TextInput
	                autoCapitalize={'none'}
	                placeholder='请输入...'
	                style={Style.input_sign}
	                underlineColorAndroid='transparent'
	                onChangeText={(value)=>{
	                  this.setState({account_id:value});
	                }}/>
	            </View>
	          </View>
	          <View style={[Style.box_row,{marginLeft:1}]}>
		          <TouchableOpacity style={Style.btn_normal} onPress={()=>{
		            bindAccount(this.state.account_id);
		          }}>
		            <Text style={Style.btn_normal_text}>确定</Text>
		          </TouchableOpacity>
		          <TouchableOpacity style={Style.btn_normal} onPress={Actions.pop}>
		            <Text style={Style.btn_normal_text}>取消</Text>
		          </TouchableOpacity>
	          </View>
					</View>
				</View>
			</View>
		)
	}
}

export default connect((state)=>{
	return {...state.account}
},(dispatch)=>{
	return bindActionCreators(AccountActions,dispatch);
})(Account);