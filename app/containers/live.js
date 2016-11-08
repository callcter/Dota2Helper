import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Image,
	View,
	TouchableOpacity,
	ListView,
	Dimensions,
  RefreshControl,
  Platform
} from 'react-native';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var timer;
var isIOS = Platform.OS==='ios';

import Icon from 'react-native-vector-icons/FontAwesome';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Video from 'react-native-video';
import NavigatorBar from '../components/NavigatorBar';

import LivePlayer from '../scenes/liveplayer';
import Douyu from '../components/Douyu';
import Zhanqi from '../components/Zhanqi';
import Huomao from '../components/Huomao';
import Panda from '../components/Panda';

import Style from '../styles/style';

export default class Live extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
      hlsUrl: '',
      videoTitle: '',
      roomId: '',
      livePlatform: ''
    };
	}
  openPlayerZhanqi(id,title) {
    this.setState({
      hlsUrl: 'http://dlhls.cdn.zhanqi.tv/zqlive/'+id+'_1024.m3u8',
      videoTitle: title,
      roomId: id,
      livePlatform: 'zhanqi'
    },function(){
      this.openLivePlayer();
    });
  }
  openPlayerHuomao(id,title) {
    fetch('http://dreamser.com/Home/Live/huomao',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: 'http://www.huomao.com/mobile/mob_live?cid='+id
      })
    }).then(response=>response.json()).then(responseData=>{
      this.setState({
        hlsUrl: 'http://live-ws-hls.huomaotv.cn/live/'+responseData.stream+'_720/playlist.m3u8',
        videoTitle: title,
        roomId: id,
        livePlatform: 'huomao'
      },function(){
        this.openLivePlayer();
      });
    }).done();
  }
  openPlayerPanda(id,title) {
    fetch('http://room.api.m.panda.tv/index.php?method=room.shareapi&roomid='+id).then(response=>response.json()).then(responseData=>{
      this.setState({
        hlsUrl: responseData.data.videoinfo.address.split('_small')[0]+'_mid.m3u8',
        videoTitle: title,
        roomId: id,
        livePlatform: 'panda'
      },function(){
        this.openLivePlayer();
      });
    }).done();
  }
	render (){
    return (
      <View style={Style.container}>
        <ScrollableTabView
          tabBarUnderlineStyle={{backgroundColor:'#fc3',height:2}}
          tabBarActiveTextColor='#fc3'>
          <Douyu tabLabel='斗鱼' />
          <Zhanqi tabLabel='战旗' />
          <Huomao tabLabel='火猫' />
          <Panda tabLabel='熊猫' />
          <View
            tabLabel='全民'>
            <Text>待开发...</Text>
          </View>
          <View
            tabLabel='龙珠'>
            <Text>待开发...</Text>
          </View>
          <View
            tabLabel='辣椒'>
            <Text>待开发...</Text>
          </View>
        </ScrollableTabView>
      </View>
    );
	}
}

function timestamp(){
  return Math.round(new Date().getTime()/1000);
}
