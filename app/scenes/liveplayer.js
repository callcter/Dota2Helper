import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View,Text,TouchableOpacity,Dimensions,Animated,Easing,ToastAndroid,Platform } from 'react-native';
import * as LivePlayerActions from '../actions/liveplayer';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import Style from '../styles/style';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var isIOS = Platform.OS==='ios';
var timer = false;
var _this = null;

class LivePlayer extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	rotation: new Animated.Value(0)
	  };
	  _this = this;
	}
  componentDidMount() {
    Animated.timing(this.state.rotation,{
      toValue: 1,
      duration: 100,
      easing: Easing.linear
    }).start();
    if(this.props.platform==='douyu'){
    	timer = setInterval(function(){
    		_this.props.refreshUrl();
    	},60*1000*1);
    }
  }
  _back() {
  	if(!isIOS){
  		ToastAndroid.show('停止播放',ToastAndroid.SHORT);
  	}
  	if(this.props.platform==='douyu'){
			clearInterval(timer);
		}
		this.props.outPlayer();
		Actions.pop();
  }
	render(){
		const { showTools,showNav,hls_url } = this.props;
		return(
			<Animated.View style={[Style.videoContainer,{transform:[{
				rotateZ: this.state.rotation.interpolate({
          inputRange: [0,1],
          outputRange: ['0deg','90deg']
        })
			}]}]}>
				<TouchableOpacity onPress={showTools}>
		      <Video
		        tabLabel='video'
		        resizeMode='stretch'
		        style={Style.videoBox}
		        source={{uri: hls_url}}/>
		      {showNav?
		      	<View style={Style.playerNav}>
			      	<Button style={Style.playerLeft} onPress={this._back.bind(this)}>
			      		<Icon name="angle-left" size={28} color='#fff' style={{paddingLeft:10}} />
			      	</Button>
			      	<View style={Style.playerRight}>
			      		<Button style={Style.playerBtn}>高清</Button>
			      		<Button style={Style.playerBtn}>订阅</Button>
			      	</View>
			      </View>:
			      <View></View>
		      }
	      </TouchableOpacity>
	    </Animated.View>
		);
	}
}

export default connect((state)=>{
	return {
		...state.liveplayer
	}
},(dispatch)=>{
	return bindActionCreators(LivePlayerActions,dispatch);
})(LivePlayer);

