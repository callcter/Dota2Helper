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
  Navigator,
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

import LivePlayer from '../scenes/liveoplayer';

import Style from '../styles/style';

export default class Live extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
      hlsUrl: '',
      videoTitle: '',
      roomId: '',
      livePlatform: '',
      ds_douyu: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2}),
      ds_zhanqi: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2}),
      ds_huomao: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2}),
      ds_panda: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2})
    };
    this.openPlayerDouyu = this.openPlayerDouyu.bind(this);
    this.openPlayerZhanqi = this.openPlayerZhanqi.bind(this);
    this.openPlayerHuomao = this.openPlayerHuomao.bind(this);
    this.openPlayerPanda = this.openPlayerPanda.bind(this);
	}
  componentDidMount() {
    this.listRoomDouyu();
    this.listRoomZhanqi();
    this.listRoomHuomao();
    this.listRoomPanda();
  }
	listRoomDouyu() {
    fetch('http://api.douyutv.com/api/v1/live/dota2?offset=0&limit=12').then(response=>response.json()).then(responseData=>{
      this.setState({
        ds_douyu: this.state.ds_douyu.cloneWithRows(responseData.data)
      });
    }).done();
  }
  listRoomZhanqi() {
    fetch('http://www.zhanqi.tv/api/static/game.lives/10/20-1.json').then(response=>response.json()).then(responseData=>{
      this.setState({
        ds_zhanqi: this.state.ds_zhanqi.cloneWithRows(responseData.data.rooms)
      });
    }).done();
  }
  listRoomHuomao() {
    fetch('http://www.huomao.com/channels/channel.json?page=1&page_size=20&cache_time='+timestamp()+'&game_url_rule=dota2').then(response=>response.json()).then(responseData=>{
      this.setState({
        ds_huomao: this.state.ds_huomao.cloneWithRows(responseData.data.channelList)
      });
    }).done();
  }
  listRoomPanda() {
    fetch('http://api.m.panda.tv/ajax_get_live_list_by_cate?cate=dota2&pageno=1&pagenum=20').then(response=>response.json()).then(responseData=>{
      this.setState({
        ds_panda: this.state.ds_panda.cloneWithRows(responseData.data.items)
      });
    }).done();
  }
  openLivePlayer() {
    const {navigator} = this.props;
    if(navigator){
      navigator.push({
        name: 'live player',
        component: LivePlayer,
        params: {
          hlsUrl: this.state.hlsUrl,
          title: this.state.videoTitle,
          roomId: this.state.roomId,
          livePlatform: this.state.livePlatform
        }
      });
    }
  }
  openPlayerDouyu(id,title) {
    fetch("http://m.douyu.com/html5/live?roomId="+id).then(response=>response.json()).then(responseData=>{
      this.setState({
        hlsUrl: responseData.data.hls_url,
        videoTitle: title,
        roomId: id,
        livePlatform: 'douyu'
      },function(){
        this.openLivePlayer();
      });
    }).done();
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
  renderRowDouyu(data:Object) {
    return (
      <View style={style.listBox}>
        <TouchableOpacity onPress={()=>{this.openPlayerDouyu(data.room_id,data.nickname)}}>
          <Image
            style={{width: screenWidth/2-3, height: screenWidth*9/32}}
            source={{uri: data.room_src}} />
          <View style={style.roomInfo}>
            <View>
              <Text style={style.roomName}>{data.nickname}</Text>
              <Text style={style.roomName}>{data.online}名观众</Text>
            </View>
            <Image
              style={{width:30,height:30,borderRadius:15}}
              source={{uri:data.avatar}}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  renderRowZhanqi(data:Object) {
    return (
      <View style={style.listBox2}>
        <TouchableOpacity onPress={()=>{this.openPlayerZhanqi(data.videoId,data.nickname)}}>
          <Image
            style={{width:screenWidth/2-3,height:screenWidth*15/56}}
            source={{uri: data.spic}} />
          <View style={style.roomInfo2}>
            <Text style={[style.roomName2,{paddingLeft:5}]}>{data.nickname}</Text>
            <Text style={[style.roomName2,{textAlign:'right',paddingRight:5}]}>{data.online}人</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  renderRowHuomao(data:Object) {
    return (
      <View style={style.listBox3}>
        <TouchableOpacity onPress={()=>{this.openPlayerHuomao(data.id,data.nickname)}}>
          <Image
            style={{width:screenWidth/2-3,height:screenWidth*11/34}}
            source={{uri: data.image}} />
          <View style={style.roomInfo2}>
            <Text style={[style.roomName2,{paddingLeft:5}]}>{data.nickname}</Text>
            <Text style={[style.roomName2,{textAlign:'right',paddingRight:5}]}>{data.views}人</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  renderRowPanda(data:Object) {
    return (
      <View style={style.listBox4}>
        <TouchableOpacity onPress={()=>{this.openPlayerPanda(data.id,data.userinfo.nickname)}}>
          <Image
            style={{width: screenWidth/2-3, height: screenWidth*19/68}}
            source={{uri: data.pictures.img}} />
          <View style={style.roomInfo}>
            <View>
              <Text style={style.roomName}>{data.userinfo.nickname}</Text>
              <Text style={style.roomName}>{data.person_num}名观众</Text>
            </View>
            <Image
              style={{width:30,height:30,borderRadius:15}}
              source={{uri:data.userinfo.avatar}}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
	render (){
    return (
      <View style={Style.container}>
        <ScrollableTabView
          tabBarUnderlineStyle={{backgroundColor:'#fc3',height:2}}
          tabBarActiveTextColor='#fc3'>
          <ListView
            tabLabel='斗鱼'
            contentContainerStyle={style.videoList}
            dataSource={this.state.ds_douyu}
            renderRow={this.renderRowDouyu.bind(this)}
            enableEmptySections={true}
            refreshControl={<RefreshControl
              onRefresh={()=>this.listRoomDouyu()}
              refreshing={false} />} />
          <ListView
            tabLabel='战旗'
            contentContainerStyle={style.videoList}
            dataSource={this.state.ds_zhanqi}
            renderRow={this.renderRowZhanqi.bind(this)}
            enableEmptySections={true}
            refreshControl={<RefreshControl
              onRefresh={()=>this.listRoomZhanqi()}
              refreshing={false} />} />
          <ListView
            tabLabel='火猫'
            contentContainerStyle={style.videoList}
            dataSource={this.state.ds_huomao}
            renderRow={this.renderRowHuomao.bind(this)}
            enableEmptySections={true}
            refreshControl={<RefreshControl
              onRefresh={()=>this.listRoomHuomao()}
              refreshing={false} />} />
          <ListView
            tabLabel='熊猫'
            contentContainerStyle={style.videoList}
            dataSource={this.state.ds_panda}
            renderRow={this.renderRowPanda.bind(this)}
            enableEmptySections={true}
            refreshControl={<RefreshControl
              onRefresh={()=>this.listRoomPanda()}
              refreshing={false} />} />
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

const style = StyleSheet.create({
  videoList: {
    flex: 1,
    marginTop: 2,
    height:screenHeight-30,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  listBox: {
    width: screenWidth/2-3,
    height: screenWidth*9/32+2,
    marginLeft: 2
  },
  listBox2: {
    width: screenWidth/2-3,
    height: screenWidth*15/56+2,
    marginLeft: 2
  },
  listBox3: {
    width: screenWidth/2-3,
    height: screenWidth*11/34+2,
    marginLeft: 2
  },
  listBox4: {
    width: screenWidth/2-3,
    height: screenWidth*19/68+2,
    marginLeft: 2
  },
  roomInfo: {
    height: isIOS?30:35,
    marginTop: -35,
    flex: 1,
    flexDirection: 'row'
  },
  roomInfo2: {
    height: isIOS?15:20,
    marginTop: -20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  roomName: {
    width: screenWidth/2-40,
    paddingRight: 5,
    fontSize: 10,
    paddingTop: 2,
    color: '#fff',
    textAlign: 'right',
    backgroundColor: 'transparent'
  },
  roomName2: {
    fontSize: 10,
    paddingTop: 2,
    color: '#fff',
    backgroundColor: 'transparent'
  }
});