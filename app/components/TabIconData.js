import React,{Component} from 'react';
import {View,Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style';

export default class TabIconUser extends Component{
	render() {
		return(
			<View>
				<Icon name='pie-chart' size={18} color={this.props.selected?'#fc3':'#ddd'} />
				<Text style={this.props.selected?Style.tabBarTitleSelected:Style.tabBarTitle}>数据</Text>
			</View>
		);
	}
}