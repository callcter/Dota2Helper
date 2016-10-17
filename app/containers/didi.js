import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	View,
	TextInput,
	Modal,
	Dimensions,
	TouchableOpacity,
	Platform,
	Navigator
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style.js';
import NavigatorBar from '../components/NavigatorBar';

export default class Didi extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	render() {
		return(
			<View style={Style.container}>
				<Text>发车</Text>
			</View>
		);
	}
}