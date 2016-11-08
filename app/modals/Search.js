import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as SearchActions from '../actions/search';
import Style from '../styles/style';

class Search extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	match_id: 0
	  }
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.status==='done'){
			Actions.matchdetail();
			return false;
		}
		return true;
	}
	render() {
		const { setMatchid } = this.props;
		return (
			<View style={Style.container}>
				<View style={Style.modal_back}>
					<View style={Style.modal_box}>
						<View style={Style.labelBox_sign}>
	            <Text style={Style.label_sign}>
	              比赛ID
	            </Text>
	            <View style={Style.inputBox_sign}>
	              <TextInput
	                autoCapitalize={'none'}
	                placeholder='请输入...'
	                style={Style.input_sign}
	                underlineColorAndroid='transparent'
	                onChangeText={(value)=>{
	                  this.setState({match_id:value});
	                }}/>
	            </View>
	          </View>
	          <View style={[Style.box_row,{marginLeft:1}]}>
		          <TouchableOpacity style={Style.btn_normal} onPress={()=>{
		          	setMatchid(this.state.match_id);
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
	return {...state.search}
},(dispatch)=>{
	return bindActionCreators(SearchActions,dispatch);
})(Search);