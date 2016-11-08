import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
	StyleSheet,
	Text,
	Image,
	View,
	TextInput,
	ListView,
	Modal,
	Dimensions,
	TouchableOpacity,
	Platform
} from 'react-native';
import * as MatchdetailActions from '../actions/matchdetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style.js';
import NavigatorBar from '../components/NavigatorBar';

var heroBaseUrl = 'http://oalqimdk5.bkt.clouddn.com/dota/heroes/';
var itemBaseUrl = 'http://oalqimdk5.bkt.clouddn.com/dota/items/';
var abilityBaseUrl = 'http://cdn.dota2.com/apps/dota2/images/abilities/';
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var isIOS = Platform.OS === 'ios';
var count = 0;

class MatchDetail extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	  count = 0;
	}
	componentDidMount() {
		this.props.getMatchdetail();
	}
	_renderRow(data: Object) {
		count++;
		return (
			<View>
				{count===1?<View style={{borderBottomWidth:2,borderBottomColor: this.props.team_win?'#5fb760':'#d75452',marginTop:5}}>
					<Text style={{backgroundColor:this.props.team_win?'#5fb760':'#d75452',color:'#fff',paddingLeft:5,paddingRight:5,paddingTop:3,paddingBottom:3,width:100,marginLeft:5}}>天辉 {this.props.team_win?'胜利':'失败'} {this.props.radiant_score}</Text>
				</View>:null}
				{count===6?<View style={{borderBottomWidth:2,borderBottomColor: this.props.team_win?'#d75452':'#5fb760',marginTop:20}}>
					<Text style={{backgroundColor: this.props.team_win?'#d75452':'#5fb760',color:'#fff',paddingLeft:5,paddingRight:5,paddingTop:3,paddingBottom:3,width:100,marginLeft:5}}>夜魇 {this.props.team_win?'失败':'胜利'} {this.props.dire_score}</Text>
				</View>:null}
				<Text style={{fontSize:14,paddingTop:5,paddingBottom:5,textAlign:'center',color:'#fc3'}}>{data.playerinfo.personaname}</Text>
				<View style={[Style.box_row]}>
					<Image
						style={{width:80,height:48,marginLeft:5,marginRight:5}}
						source={{uri: heroBaseUrl+data.hero.image_url1}} />
					<View style={[Style.box_row,{width:screenWidth-241,marginRight:5,paddingTop:3,justifyContent:'space-between'}]}>
						<View>
							<Text style={{fontSize:10}}>KDA: {data.kills}/{data.deaths}/{data.assists}</Text>
							<Text style={{fontSize:10}}>GPM: {data.gold_per_min}</Text>
							<Text style={{fontSize:10}}>XPM: {data.xp_per_min}</Text>
						</View>
						<View>
							<Text style={{fontSize:10}}>等级: {data.level}</Text>
							<Text style={{fontSize:10}}>金钱: {data.gold+data.gold_spent}</Text>
							<Text style={{fontSize:10}}>输出: {data.hero_damage}</Text>
						</View>
					</View>
					<View style={{width:96}}>
						<View style={Style.box_row}>
							<Image
								style={{width:32,height:24,padding:3,borderWidth:1,borderColor:'#ddd'}}
								source={{uri: itemBaseUrl+data.items[0].image_url}} />
							<Image
								style={{width:32,height:24,padding:3,borderWidth:1,borderColor:'#ddd'}}
								source={{uri: itemBaseUrl+data.items[1].image_url}} />
							<Image
								style={{width:32,height:24,padding:3,borderWidth:1,borderColor:'#ddd'}}
								source={{uri: itemBaseUrl+data.items[2].image_url}} />
						</View>
						<View style={Style.items}>
							<Image
								style={{width:32,height:24,padding:3,borderWidth:1,borderColor:'#ddd'}}
								source={{uri: itemBaseUrl+data.items[3].image_url}} />
							<Image
								style={{width:32,height:24,padding:3,borderWidth:1,borderColor:'#ddd'}}
								source={{uri: itemBaseUrl+data.items[4].image_url}} />
							<Image
								style={{width:32,height:24,padding:3,borderWidth:1,borderColor:'#ddd'}}
								source={{uri: itemBaseUrl+data.items[5].image_url}} />
						</View>
					</View>
					<Image
						style={{width:40,height:40,borderRadius:20,marginLeft:5,marginRight:5,marginTop:4}}
						source={{uri: data.playerinfo.avatar}} />
				</View>
				<View style={[Style.box_row,{marginTop:5}]}>
					<View style={{width:screenWidth/3,paddingLeft:5}}>
						<Text style={{fontSize:10}}>英雄伤害：{data.hero_damage}</Text>
						<Text style={{fontSize:10}}>受到英雄伤害：{data.scaled_hero_damage}</Text>
					</View>
					<View style={{width:screenWidth/3,paddingLeft:5}}>
						<Text style={{fontSize:10}}>防御塔伤害：{data.tower_damage}</Text>
						<Text style={{fontSize:10}}>受到防御塔伤害：{data.scaled_tower_damage}</Text>
					</View>
					<View style={{width:screenWidth/3,paddingLeft:5}}>
						<Text style={{fontSize:10}}>治疗：{data.hero_healing}</Text>
						<Text style={{fontSize:10}}>接受治疗：{data.scaled_hero_healing}</Text>
					</View>
				</View>
				<View style={[Style.box_row,{flexWrap:'wrap',marginTop:5,marginLeft:5,paddingBottom:5}]}>
					{this._renderAbilities(data.ability)}
				</View>
			</View>
		);
	}
	_renderAbilities(data: Array) {
		let abilities = new Array();
		for(var i=0;i<data.length;i++){
			abilities.push(
				<Image
					key={data[i].name+i}
					style={{width:(screenWidth-10-13)/13,height:(screenWidth-10-13)/13,padding:1,marginLeft:1,marginTop:2}}
					source={{uri: data[i].name==='attribute_bonu'? ( abilityBaseUrl+data[i].name+'_hp1.png' ) : ( abilityBaseUrl+data[i].name+'_hp1.png')}}/ >
			);
		}
		return(
			abilities
		);
	}
	render() {
		var { dataSource,duration,match_id } = this.props;
		return (
			<View style={Style.container}>
				<NavigatorBar
					left={<Icon name='angle-left' size={32} style={{marginTop:-8}} color='#fc3' />}
					leftClick={()=>{Actions.pop()}}
					title={
						<Text style={Style.navTitle_text}>{match_id}</Text>
					}/>
				<Text style={{textAlign:'center',paddingTop:5,paddingBottom:5}}>持续时间：{parseInt(duration/60)}分{duration%60}秒</Text>
				<ListView
					dataSource={ dataSource }
					renderRow={this._renderRow.bind(this)}
					enableEmptySections={true} />
			</View>
		);
	}
}

function mapStateToProps(state){
	return {
		...state.matchdetail
	}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(MatchdetailActions,dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(MatchDetail);

