import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	View,
	ListView,
	Navigator
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';

import Style from '../styles/style'

import User from '../containers/user';
import Data from '../containers/data';
import Didi from '../containers/didi';
import Live from '../containers/live';

var count = 1;

export default class Index extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	selectedTab: 'user'
	  };
	}
	render() {
		const {navigator} = this.props;
		return (
			<TabNavigator>
				<TabNavigator.Item
					selected={this.state.selectedTab==='user'}
					renderIcon={()=><Icon name='snapchat-ghost' size={18} color='#ddd' />}
					renderSelectedIcon={()=><Icon name='snapchat-ghost' size={18} color='#fc3' />}
					title="我的"
					onPress={()=>this.setState({selectedTab:'user'})}
					titleStyle={Style.tabTitle}
          selectedTitleStyle={Style.tabTitle_selected}>
					<User navigator={navigator} />
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab==='live'}
					renderIcon={()=><Icon name='twitch' size={18} color='#ddd' />}
					renderSelectedIcon={()=><Icon name='twitch' size={18} color='#fc3' />}
					title="直播"
					onPress={()=>this.setState({selectedTab:'live'})}
					titleStyle={Style.tabTitle}
          selectedTitleStyle={Style.tabTitle_selected}>
					<Live navigator={navigator} />
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab==='data'}
					renderIcon={()=><Icon name='pie-chart' size={18} color='#ddd' />}
					renderSelectedIcon={()=><Icon name='pie-chart' size={18} color='#fc3' />}
					title="数据"
					onPress={()=>this.setState({selectedTab:'data'})}
					titleStyle={Style.tabTitle}
          selectedTitleStyle={Style.tabTitle_selected}>
					<Data navigator={navigator} />
				</TabNavigator.Item>
				<TabNavigator.Item
					selected={this.state.selectedTab==='didi'}
					renderIcon={()=><Icon name='cab' size={18} color='#ddd' />}
					renderSelectedIcon={()=><Icon name='cab' size={18} color='#fc3' />}
					title="发现"
					onPress={()=>this.setState({selectedTab:'didi'})}
					titleStyle={Style.tabTitle}
          selectedTitleStyle={Style.tabTitle_selected}>
					<Didi navigator={navigator} />
				</TabNavigator.Item>
			</TabNavigator>
		);
	}
}