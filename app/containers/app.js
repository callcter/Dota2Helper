import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ListView
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

export default class app extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	dataSource: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2})
	  };
	  this.getMatch();
	}

	getMatch() {
		fetch('http://dota.dreamser.com/matchp',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				match_id: '2632754039'
			})
		}).then(response=>response.json()).then(responseData=>{
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData.players)
			});
		}).done();
	}

	_renderRow(data: Object) {
		return (
			<View>
				<Text>{data.account_id}</Text>
			</View>
		);
	}
	render() {
		return (
			<ListView
				style={{marginTop:20}}
				dataSource={this.state.dataSource}
				renderRow={this._renderRow.bind(this)}
				enableEmptySections={true} />
		);
	}
}