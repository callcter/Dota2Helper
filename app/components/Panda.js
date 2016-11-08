import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text,Image,View,TouchableOpacity,ListView,Dimensions,RefreshControl,Platform } from 'react-native';
import * as PandaActions from '../actions/panda';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style';

var screenWidth = Dimensions.get('window').width;

class Panda extends Component{
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
		this.props.pandaList();
	}
	_renderRow(data:Object) {
		return (
			<View style={Style.listBox4}>
        <TouchableOpacity onPress={()=>{this.props.setPlayer(data.id,data.userinfo.nickname)}}>
          <Image
            style={{width: screenWidth/2-3, height: screenWidth*19/68}}
            source={{uri: data.pictures.img}} />
          <View style={Style.roomInfo}>
            <View>
              <Text style={Style.roomName}>{data.userinfo.nickname}</Text>
              <Text style={Style.roomName}>{data.person_num}名观众</Text>
            </View>
            <Image
              style={{width:30,height:30,borderRadius:15}}
              source={{uri:data.userinfo.avatar}}/>
          </View>
        </TouchableOpacity>
      </View>
		)
	}
	render() {
		const { pandaRefresh,rooms } = this.props;
		return (
			<ListView
        contentContainerStyle={Style.videoList}
        dataSource={this.state.dataSource.cloneWithRows(rooms)}
        renderRow={this._renderRow.bind(this)}
        enableEmptySections={true}
        refreshControl={<RefreshControl
          onRefresh={()=>this.listRoomPanda()}
          refreshing={false} />} />
		)
	}
}

export default connect((state)=>{
	return {
		...state.panda
	}
},(dispatch)=>{
	return bindActionCreators(PandaActions,dispatch)
})(Panda);