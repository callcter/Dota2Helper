import {StyleSheet,Dimensions,Platform} from 'react-native';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var isIOS = Platform.OS==='ios';

export default style = StyleSheet.create({
	container: {
    flex: 1,
    width: screenWidth,
    marginTop: isIOS?20:0,
    justifyContent: 'flex-start'
  },
  tabBarStyle: {
    backgroundColor: '#444'
  },
  tabBarTitle: {
    textAlign: 'center',
    color: '#ddd',
    fontSize: 10,
    paddingTop: 5
  },
  tabBarTitleSelected: {
    textAlign: 'center',
    color: '#fc3',
    fontSize: 10,
    paddingTop: 5
  },
	items: {
		flex: 1,
		flexDirection: 'row'
	},
	back: {
		backgroundColor: '#444'
	},
	font: {
		color: '#fc3',
		textAlign: 'center'
	},
  navTitle_text: {
    fontSize: 16,
    color: '#fc3',
    textAlign: 'center'
  },
  labelBox_sign: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 5,
    width: 280,
    overflow: 'hidden'
  },
  label_sign: {
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  inputBox_sign: {
    marginLeft: 10,
    width: 270,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
  },
  input_sign: {
    padding: 5,
    fontSize: 14,
    height: 30,
  },
  btn_normal: {
    width: 130,
    marginLeft: 13,
    marginTop: 15,
    backgroundColor: '#fc3',
    borderRadius: 5,
    overflow: 'hidden'
  },
  btn_normal_text: {
    color: "#fff",
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center'
  },
  box_row: {
    flexDirection: 'row'
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'visible',
    width: screenHeight,
    height: screenWidth,
    marginTop: isIOS?(screenHeight-screenWidth)/2+20:(screenHeight-screenWidth)/2,
    marginLeft: -(screenHeight-screenWidth)/2,
  },
  videoBox:{
    marginTop: 0,
    marginLeft: 0,
    width: screenHeight-20,
    height: screenWidth,
    overflow: 'visible'
  },
  playerNav: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    top: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: screenHeight-20,
    height: 30,
    zIndex: 10
  },
  playerLeft: {
    marginTop: 3,
    paddingLeft:10
  },
  playerRight: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
    marginTop: 3
  },
  playerBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 3,
    fontSize: 12
  },
  scroll_footer: {
    height: 20,
    width: screenWidth,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scroll_footer_icon: {
    width: 14,
    height: 14,
  },
  scroll_footer_text: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginLeft: 5
  },
  modal_back: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  modal_box: {
    width: 300,
    height: isIOS?130:140,
    marginLeft: (screenWidth-300)/2,
    marginTop: isIOS?(screenHeight-130)/2:(screenHeight-140)/2,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  //抽屉菜单
  drawer: {
    backgroundColor: '#666',
    marginTop: isIOS?20:0,
    height: isIOS?screenHeight-20:screenHeight,
  },
  drawer_container: {
    width: screenWidth*0.7-30,
    marginLeft: 30,
    marginTop: 30,
    height: screenHeight-50
  },
  drawer_avatar: {
    flexDirection: 'row',
    marginBottom: 20
  },
  drawer_avatar_image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden'
  },
  drawer_avatar_text: {
    fontSize: 12,
    paddingTop: 10,
    paddingLeft: 5,
    marginLeft: 5,
    color: '#ddd'
  },
  drawer_menu: {
    borderTopColor: '#999',
    borderTopWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10
  },
  drawer_menu_item: {
    height: 30,
    paddingLeft: 5,
    color: '#ddd',
    fontSize: 13,
    lineHeight: 30
  },
  videoList: {
    flex: 1,
    marginTop: 2,
    height:screenHeight-80,
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