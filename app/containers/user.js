import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
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

import * as UserinfoActions from '../actions/userinfo';

import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style.js';
import NavigatorBar from '../components/NavigatorBar';

import Matches from '../scenes/matchlist';
import MatchDetail from '../scenes/matchdetail';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var isIOS = Platform.OS === 'ios';

class User extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	match_id: 0,
	  	account_id: 0,
	  	modalVisible: false,
	  	idModalVisible: false
	  };
	}
	componentDidMount() {
		// storage.remove({
		// 	key: 'account'
		// });
		this.props.hasLogin();
	}
	setAccount() {
		this.setState({
			idModalVisible: true
		});
	}
	closeSetAccount() {
		return false;
	}
	_matchList() {
		const {navigator} = this.props;
		if(navigator){
			navigator.push({
				name: 'matches',
				component: Matches
			});
		}
	}
	_matchDetail() {
		const {navigator} = this.props;
		if(navigator){
			navigator.push({
				name: 'match detail',
				component: MatchDetail
			});
		}
	}
	searchClick() {
		this.setState({
			modalVisible: true
		});
	}
	closeSearch() {
		return false;
	}
	render() {
		var { getUserinfo,setAccount,avatar,nickname,account_id,hasAccount,setMatchid } = this.props;
		return(
			<View style={Style.container}>
				<NavigatorBar
					left={<Icon name='gear' size={20} style={{marginTop:-1}} color='#fc3' />}
					leftClick={this.setAccount.bind(this)}
					title={<Text style={Style.navTitle_text}>DOTA2 Helper</Text>}
					right={<Icon name='search' size={20} style={{marginTop:3}} color='#fc3' />}
					rightClick={this.searchClick.bind(this)} />
				<Image
					source={{uri: avatar}}
					style={{width:60,height:60,borderRadius:30,marginTop:10,marginBottom:10,marginLeft:screenWidth/2-30}}/>
				<Text style={{textAlign:'center'}}>{nickname}</Text>
				{account_id===0?<Text style={{textAlign:'center'}}>尚未设置账号，点击左上角设置</Text>:
				<TouchableOpacity
					onPress={this._matchList.bind(this)}
					style={{width:100,marginTop:10,marginBottom:10,marginLeft:screenWidth/2-50,backgroundColor:'#999',borderRadius:5}}>
					<Text style={{textAlign:'center',color: '#fff',padding:10}}>近期比赛</Text>
				</TouchableOpacity>}
				<Modal
					animationType='fade'
					visible={this.state.modalVisible}
					transparent={true}
					onRequestClose={()=>this.closeSearch.bind(this)}>
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
			            this._matchDetail();
			            this.setState({
			            	modalVisible: false
			            });
			          }}>
			            <Text style={Style.btn_normal_text}>确定</Text>
			          </TouchableOpacity>
			          <TouchableOpacity style={Style.btn_normal} onPress={()=>{
			            this.setState({
			            	modalVisible: false
			            });
			          }}>
			            <Text style={Style.btn_normal_text}>取消</Text>
			          </TouchableOpacity>
		          </View>
						</View>
					</View>
				</Modal>
				<Modal
					animationType='fade'
					visible={ (!hasAccount)||this.state.idModalVisible }
					transparent={true}
					onRequestClose={()=>this.closeSetAccount.bind(this)}>
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
			            setAccount(this.state.account_id);
			          }}>
			            <Text style={Style.btn_normal_text}>确定</Text>
			          </TouchableOpacity>
			          <TouchableOpacity style={Style.btn_normal} onPress={()=>{
			            this.setState({
			            	idModalVisible: false
			            });
			          }}>
			            <Text style={Style.btn_normal_text}>取消</Text>
			          </TouchableOpacity>
		          </View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

function mapStateToProps(state){
	return {
		...state.userinfo
	}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(UserinfoActions,dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(User);
