import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ListView,
	Dimensions,
  Modal,
  RefreshControl,
  Animated,
  Easing,
  Navigator,
  ToastAndroid
} from 'react-native';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var timer = false;
var _this = null;

import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import NavigatorBar from '../components/NavigatorBar';

import Style from '../styles/style';

export default class LivePlayer extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	hlsUrl: this.props.hlsUrl,
	  	rotation: new Animated.Value(0)
	  };
	  _this = this;
	}
  componentDidMount() {
  	_this = this;
    Animated.timing(this.state.rotation,{
      toValue: 1,
      duration: 100,
      easing: Easing.linear
    }).start();
    if(this.props.livePlatform==='douyu'){
    	timer = setInterval(function(){
    		_this._douyu();
    	},60*1000*4);
    }
  }
  _goBack() {
  	let {navigator} = this.props;
		if(navigator){
			navigator.pop();
		}
  }
  handleBack() {
  	ToastAndroid.show('停止播放',ToastAndroid.SHORT);
		if(timer){
			clearInterval(timer);
		}
		_this._goBack();
		return true;
  }
  _douyu() {
  	fetch("http://m.douyu.com/html5/live?roomId="+this.props.roomId).then(response=>response.json()).then(responseData=>{
      this.setState({
        hlsUrl: responseData.data.hls_url
      });
    }).done();
  }
	render(){
		return(
			<Animated.View style={[Style.videoContainer,{transform:[{
				rotateZ: this.state.rotation.interpolate({
          inputRange: [0,1],
          outputRange: ['0deg','90deg']
        })
			}]}]}>
	      <Video
	        tabLabel='video'
	        resizeMode='stretch'
	        style={Style.videoBox}
	        source={{uri: this.state.hlsUrl}}/>
	    </Animated.View>
		);
	}
}