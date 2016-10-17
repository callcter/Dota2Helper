import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	View,
	ListView,
	TouchableOpacity,
	Platform,
	Navigator
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style.js';
import NavigatorBar from '../components/NavigatorBar';
import MatchDetail from '../scenes/matchdetail';

var heroBaseUrl = 'http://oalqimdk5.bkt.clouddn.com/dota/heroes/';

export default class MatchList extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	match_id: 0,
	  	account_id: 197301278,
	  	dataSource: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2})
	  };
	}

	componentDidMount() {
		this.getMatchList();
	}

	getMatchList() {
		fetch('http://dota.dreamser.com/matchlist',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				account_id: this.state.account_id
			})
		}).then(response=>response.json()).then(responseData=>{
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(responseData.matches)
			});
		}).done();
	}

	matchDetail(matchid) {
		const {navigator} = this.props;
		if(navigator){
			navigator.push({
				name: 'match detail',
				component: MatchDetail,
				params: {
					match_id: matchid
				}
			});
		}
	}

	_back() {
		const {navigator} = this.props;
		if(navigator){
			navigator.pop();
		}
	}

	_renderRow(data:Object) {
		return (
			<TouchableOpacity
				style={{marginTop:5}}
				onPress={()=>{
					this.matchDetail(data.match_id);
				}}>
				<View style={Style.box_row}>
					<Image
						style={{width:40,height:40,borderRadius:20,marginLeft:10,marginRight:10}}
						source={{uri: heroBaseUrl+data.hero.image_url1}}/>
					<View>
						<Text style={{lineHeight:20}}>比赛编号：{data.match_id}</Text>
						<Text>开始时间：{timestamp(data.start_time)}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return(
			<View style={Style.container}>
				<NavigatorBar
					left={<Icon name='angle-left' size={32} style={{marginTop:-8}} color='#fc3' />}
					leftClick={this._back.bind(this)}
					title={<Text style={Style.navTitle_text}>近期比赛</Text>}/>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}
					enableEmptySections={true} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
});

function timestamp(stamp){
	var unixTimestamp = new Date(stamp * 1000);
	return unixTimestamp.toLocaleString();
}
