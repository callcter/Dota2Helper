import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';

import Style from '../styles/style';

export default class Error extends Component{
	render() {
		return(
			<View style={Style.container}>
				<Text>err</Text>
			</View>
		);
	}
}