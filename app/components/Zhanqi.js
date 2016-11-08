import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Text,Image,View,TouchableOpacity,ListView,Dimensions,RefreshControl,Platform } from 'react-native';
import * as ZhanqiActions from '../actions/zhanqi';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style';

var screenWidth = Dimensions.get('window').width;

class Zhanqi extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	dataSource: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2})
	  };
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.status==='play'){
			Actions.liveplayer();
			return false;
		}
		return true;
	}
	componentDidMount() {
		this.props.zhanqiList();
	}
	_renderRow(data:Object) {
		return (
      <View style={Style.listBox2}>
        <TouchableOpacity onPress={()=>{this.props.setPlayer(data.videoId,data.nickname)}}>
          <Image
            style={{width:screenWidth/2-3,height:screenWidth*15/56}}
            source={{uri: data.spic}} />
          <View style={Style.roomInfo2}>
            <Text style={[Style.roomName2,{paddingLeft:5}]}>{data.nickname}</Text>
            <Text style={[Style.roomName2,{textAlign:'right',paddingRight:5}]}>{data.online}人</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
	}
	render() {
		const { zhanqiRefresh,rooms } = this.props;
		return (
			<ListView
        contentContainerStyle={Style.videoList}
        dataSource={this.state.dataSource.cloneWithRows(rooms)}
        renderRow={this._renderRow.bind(this)}
        enableEmptySections={true}
        refreshControl={<RefreshControl
          onRefresh={()=>{zhanqiRefresh()}}
          refreshing={false} />} />
		)
	}
}

export default connect((state)=>{
	return {
		...state.zhanqi
	}
},(dispatch)=>{
	return bindActionCreators(ZhanqiActions,dispatch)
})(Zhanqi);