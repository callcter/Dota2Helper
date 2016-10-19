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
	tabTitle: {
    fontSize: 10,
    color: '#ddd',
    paddingBottom: 5
  },
  tabTitle_selected: {
    fontSize: 10,
    color: '#fc3',
    paddingBottom: 5
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
  }
});