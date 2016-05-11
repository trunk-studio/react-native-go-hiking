import React, {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const m1 = require('../images/month/1.png');
const m2 = require('../images/month/2.png');
const m3 = require('../images/month/3.png');
const m4 = require('../images/month/4.png');
const m5 = require('../images/month/5.png');
const m6 = require('../images/month/6.png');
const m7 = require('../images/month/7.png');
const m8 = require('../images/month/8.png');
const m9 = require('../images/month/9.png');
const m10 = require('../images/month/10.png');
const m11 = require('../images/month/11.png');
const m12 = require('../images/month/12.png');

const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  commentContent: {
    marginLeft: windowSize.width * 0.1,
    marginRight: windowSize.width * 0.1,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#064c69',
    borderWidth: 1,
    // shadowOpacity: 1,
    // shadowColor: 'rgba(147, 147, 147, 0.6)',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
  },
  titleBar: {
    flexDirection: 'row',
  },
  titles: {
    flex: 4,
    fontWeight: '400',
    fontSize: 18,
    color: '#064c69',
    letterSpacing: 1,
    paddingLeft: 20,
  },
  subTitles: {
    flex: 5,
    fontSize: 16,
    marginLeft: 15,
    color: '#064c69',
  },
  commentBody: {
    flex: 1,
    height: 70,
    justifyContent: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default function CateItem(props) {
  function pressHandle() {
    Actions.postList({
      mIndex: props.mIndex,
      title: props.title,
    });
  }
  function getImage(month) {
    switch (month) {
      case 1:
        return m1;
      case 2:
        return m2;
      case 3:
        return m3;
      case 4:
        return m4;
      case 5:
        return m5;
      case 6:
        return m6;
      case 7:
        return m7;
      case 8:
        return m8;
      case 9:
        return m9;
      case 10:
        return m10;
      case 11:
        return m11;
      default:
        return m12;
    }
  }
  return (
    <TouchableOpacity underlayColor={"#f3f3f3"} onPress={pressHandle}>
      <View style={styles.commentContent}>
        <Image source={getImage(props.mIndex)} style={ styles.avatar } />
        <View style={styles.commentBody}>
          <View style={styles.titleBar}>
            <Text style={styles.titles}>{props.title}</Text>
            <Text style={styles.subTitles}>{props.subTitle}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

CateItem.propTypes = {
  title: React.PropTypes.string,
  subTitle: React.PropTypes.string,
  mIndex: React.PropTypes.number,
  uri: React.PropTypes.string,
};

CateItem.defaultProps = {
};
