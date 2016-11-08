import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions,ActionConst } from 'react-native-router-flux';
import {
	Text,
	Image,
	View,
	TextInput,
	Modal,
	Dimensions,
	TouchableOpacity,
	Platform,
	Navigator,
	StyleSheet,
} from 'react-native';

import * as UserActions from '../actions/user';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style';
import NavigatorBar from '../components/NavigatorBar';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var isIOS = Platform.OS === 'ios';

class User extends Component{
	constructor(props) {
	  super(props);
	  this.state = {}
	}
	componentDidMount() {
		this.props.hasLogin();
	}
	shouldComponentUpdate(nextProps, nextState) {
		console.log(nextProps.status);
		if(nextProps.status==='doing'){
			Actions.account();
			return false;
		}
		if(nextProps.status==='do'){
			nextProps.getUser();
		}
		return true;
	}
	render() {
		const { avatar,nickname,status } = this.props;
		return(
			<View style={Style.container}>
				<NavigatorBar
					left={<Icon name='gear' size={20} style={{marginTop:-1}} color='#fc3' />}
					leftClick={()=>{Actions.refresh({key:'drawer',open:value=>!value})}}
					title={<Text style={Style.navTitle_text}>DOTA2 Helper</Text>}
					right={<Icon name='search' size={20} style={{marginTop:3}} color='#fc3'/>}
					rightClick={()=>{Actions.search()}}/>
				<Image
					source={{uri: avatar}}
					style={{width:60,height:60,borderRadius:30,marginTop:10,marginBottom:10,marginLeft:screenWidth/2-30}}/>
				<Text style={{textAlign:'center'}}>{nickname}</Text>
				{status==='done'?<Button style={styles.btn} onPress={Actions.matchlist}>近期比赛</Button>:<Text style={{textAlign:'center'}}>尚未设置账号，点击左上角设置</Text>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	btn: {
		width: 100,
		marginTop: 10,
		marginBottom: 10,
		marginLeft: screenWidth/2-50,
		backgroundColor: '#999',
		borderRadius: 5,
		color: '#fff',
		textAlign: 'center',
		paddingTop: 5,
		paddingBottom: 5,
		fontSize: 14
	}
})

export default connect((state)=>{
		return {...state.user}
	},(dispatch)=>{
	  return bindActionCreators(UserActions,dispatch);
	})(User);