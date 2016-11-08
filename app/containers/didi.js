import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet,Text,Image,View,TextInput,Modal,Dimensions,Platform } from 'react-native';
import * as DidiActions from '../actions/didi';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style.js';
import NavigatorBar from '../components/NavigatorBar';
import Button from 'react-native-button';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var isIOS = Platform.OS === 'ios';

class Didi extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.status==='playvideo'){
			Actions.videoplayer();
			return false;
		}
		return true;
	}
	render() {
		const { setPlayer } = this.props;
		return(
			<View style={Style.container}>
				<Swiper
					style={styles.container}
					showsButtons={false}
					autoplay={true}
					width={screenWidth}
					height={200}
					dot={<View style={styles.dotStyle}/>}
					activeDot={<View style={styles.activeDotStyle}/>}>
					<Button>
						<Image
							style={{width:screenWidth,height:200,resizeMode:'cover'}}
							source={require('../images/banner1.jpg')}/>
					</Button>
					<Button>
						<Image
							style={{width:screenWidth,height:200,resizeMode:'cover'}}
							source={require('../images/banner2.jpg')}/>
					</Button>
					<Button>
						<Image
							style={{width:screenWidth,height:200,resizeMode:'cover'}}
							source={require('../images/banner3.jpg')}/>
					</Button>
				</Swiper>
				<Button onPress={()=>{setPlayer('7001726')}}>视频</Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f7f8f9'
	},
	dotStyle: {
		backgroundColor: 'rgba(0,0,0,0.2)',
		width: 6,
		height: 6,
		borderRadius: 3,
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		marginBottom: isIOS?-20:0
	},
	activeDotStyle: {
		backgroundColor: '#fc3',
		width: 6,
		height: 6,
		borderRadius: 3,
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		marginBottom: isIOS?-20:0
	},
});
function mapStateToProps(state){
	return {
		...state.didi
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators(DidiActions,dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Didi);