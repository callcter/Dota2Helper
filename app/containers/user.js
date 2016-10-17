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

import Matches from '../scenes/matches';
import MatchDetail from '../scenes/matchdetail';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var isIOS = Platform.OS === 'ios';

export default class User extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	match_id: 0,
	  	account_id: 0,
	  	modalVisible: false,
	  	avatar: 'http://oalqimdk5.bkt.clouddn.com/1609165315339.jpg',
	  	nickname: '',
	  	idModalVisible: false
	  };
	}

	componentDidMount() {
		// storage.remove({
		// 	key: 'account'
		// });
		this._hasSetAccount();
	}

	//验证是否设置账号
	_hasSetAccount() {
		var _this = this;
		storage.load({
			key: 'account'
		}).then(ret=>{
			if(ret.accountId){
				_this.setState({
					account_id: parseInt(ret.accountId)
				},function(){
					_this._userInfo();
				});
			}else{
				_this.setState({
					idModalVisible: true
				});
			}
		}).catch(err=>{
			_this.setState({
				idModalVisible: true
			});
		});
	}

	setAccount() {
		this.setState({
			idModalVisible: true
		});
	}

	closeSetAccount() {
		return false;
	}

	_userInfo() {
		fetch('http://dota.dreamser.com/listofaccount',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				steam_id: parseInt(this.state.account_id)
			})
		}).then(response=>response.json()).then(responseData=>{
			this.setState({
				avatar: responseData.response.players[0].avatarmedium,
				nickname: responseData.response.players[0].personaname
			});
		}).done();
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
				component: MatchDetail,
				params: {
					match_id: this.state.match_id
				}
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
		return(
			<View style={Style.container}>
				<NavigatorBar
					left={<Icon name='gear' size={20} style={{marginTop:-1}} color='#fc3' />}
					leftClick={this.setAccount.bind(this)}
					title={<Text style={Style.navTitle_text}>DOTA2 Helper</Text>}
					right={<Icon name='search' size={20} style={{marginTop:3}} color='#fc3' />}
					rightClick={this.searchClick.bind(this)} />
				<Image
					source={{uri:this.state.avatar}}
					style={{width:60,height:60,borderRadius:30,marginTop:10,marginBottom:10,marginLeft:screenWidth/2-30}}/>
				<Text style={{textAlign:'center'}}>{this.state.nickname}</Text>
				{this.state.account_id===0?<Text style={{textAlign:'center'}}>尚未设置账号，点击左上角设置</Text>:
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
					<View style={styles.modal_back}>
						<View style={styles.modal_box}>
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
					visible={this.state.idModalVisible}
					transparent={true}
					onRequestClose={()=>this.closeSetAccount.bind(this)}>
					<View style={styles.modal_back}>
						<View style={styles.modal_box}>
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
			          	storage.save({
			          		key: 'account',
			          		rawData: {
			          			accountId: parseInt(this.state.account_id)
			          		},
			          		expires: null
			          	}).then(()=>{
			          		console.log(storage);
			          	});
			            this._userInfo();
			            this.setState({
			            	idModalVisible: false
			            });
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

const styles = StyleSheet.create({
	modal_back: {
		backgroundColor: 'rgba(0,0,0,0.3)',
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	modal_box: {
		width: 300,
		height: isIOS?130:140,
		marginLeft: (screenWidth-300)/2,
		marginTop: isIOS?(screenHeight-130)/2:(screenHeight-140)/2,
		backgroundColor: '#fff',
		borderRadius: 5
	}
});
