import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet,Text,View,TouchableOpacity,Dimensions,Animated,Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import NavigatorBar from '../components/NavigatorBar';
import Style from '../styles/style';
import * as VideoplayerActions from '../actions/videoplayer';
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

class VideoPlayer extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	render(){
		const { outPlayer,uri } = this.props;
		return(
			<View style={Style.container}>
			<NavigatorBar
				left={<Icon name='angle-left' size={20} color='#fc3' />}
				leftClick={()=>{
					outPlayer();
					Actions.pop();
				}}
				title={<Text style={Style.navTitle_text}>发车</Text>} />
	      <Video
	        tabLabel='video'
	        resizeMode='cover'
	        style={{width:screenWidth,height:200}}
	        source={{uri: uri}}/>
       </View>
		);
	}
}

export default connect((state)=>{
	return {
		...state.videoplayer
	}
},(dispatch)=>{
	return bindActionCreators(VideoplayerActions,dispatch)
})(VideoPlayer)