import React,{Component} from 'react';
import {connect} from 'react-redux';
import {
	View,Text
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Style from '../styles/style';
import Button from 'react-native-button';

class SignUp extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	render() {
		return(
			<View style={Style.container}>
				<Text>signup</Text>
				<Button onPress={Actions.pop}>返回</Button>
			</View>
		)
	}
}

export default connect()(SignUp)