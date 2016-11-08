import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text,Image,View,TouchableOpacity,ListView,Dimensions,RefreshControl,Platform } from 'react-native';
import * as DouyuActions from '../actions/douyu';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style';

var screenWidth = Dimensions.get('window').width;

class Douyu extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	dataSource: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2})
	  }
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.status==='play'){
			Actions.liveplayer();
			return false;
		}
		return true;
	}
	componentDidMount() {
		this.props.douyuList();
	}
	_renderRow(data:Object) {
		return (
			<View style={Style.listBox}>
        <TouchableOpacity onPress={()=>{this.props.setPlayer(data.room_id,data.nickname)}}>
          <Image
            style={{width: screenWidth/2-3, height: screenWidth*9/32}}
            source={{uri: data.room_src}} />
          <View style={Style.roomInfo}>
            <View>
              <Text style={Style.roomName}>{data.nickname}</Text>
              <Text style={Style.roomName}>{data.online}名观众</Text>
            </View>
            <Image
              style={{width:30,height:30,borderRadius:15}}
              source={{uri:data.avatar}}/>
          </View>
        </TouchableOpacity>
      </View>
		)
	}
	render() {
		const { douyuRefresh,rooms } = this.props;
		return (
			<ListView
	      contentContainerStyle={Style.videoList}
	      dataSource={this.state.dataSource.cloneWithRows(rooms)}
	      renderRow={this._renderRow.bind(this)}
	      enableEmptySections={true}
	      refreshControl={<RefreshControl
	        onRefresh={()=>{douyuRefresh()}}
	        refreshing={false} />} />
		)
	}
}

export default connect((state)=>{
	return {
		...state.douyu
	}
},(dispatch)=>{
	return bindActionCreators(DouyuActions,dispatch)
})(Douyu);