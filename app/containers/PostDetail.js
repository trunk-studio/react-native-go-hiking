import React, {
  Image,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import CoverCard from '../components/CoverCard';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import ParallaxView from 'react-native-parallax-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const StyleSheet = require('../utils/F8StyleSheet');
const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: '500',
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  placeText: {
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
  },
  wrapper: {
    flex: 1,
    marginBottom: 50,
    ios: {
      marginTop: 65,
    },
    android: {
      marginTop: 55,
    },
  },
  scrollFrame: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 25,
  },
  scrollContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: 'rgb(246, 246, 246)',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },
  statusBlock: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 2,
    paddingBottom: 2,
  },
  headerInfo: {
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: 'rgba(0,0,0,.55)',
  },
  favoriteIcon: {
    margin: 0,
  },
  articleHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});


function PostDetail(props) {
  function info() {
    let infos = [];
    if (props.level) {
      let star = '';
      for (let i = 0; i < props.level; i++) {
        star += '★';
      }
      infos.push(<Text style={styles.infoText} key={'level'}>難易度：{star}</Text>);
    }
    if (props.detail_02 !== 'null') {
      infos.push(
        <Text
          style={styles.infoText}
          key={'detail_02'}
        >
          {props.detail_02}
        </Text>
      );
    }
    return infos;
  }
  function map() {
    let mapImg;
    if (props.map !== 'null') {
      mapImg = (
        <View style={{ flex: 1, marginBottom: 20 }}>
          <Image
            source={{ uri: props.map }}
            style={{
              flex: 1,
              padding: 20,
              height: 500,
            }}
          />
      </View>
      );
    }
    return mapImg;
  }

  navigate = () => {
    Alert.alert('', '立即前往', [
      { text: '確認', onPress: () => {
        console.log(props);
        const url = `https://www.google.com.tw/maps/dir/${props.myLat},${props.myLon}/${props.lat},${props.lon}`;
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          }
        });
      } },
      { text: '取消', onPress: () => {} },
    ]);
  };

  let tagColor = '';
  if (!!props.status) {
    switch (props.status) {
      case '全線封閉':
        tagColor = 'rgba(213, 64, 64, .8)';
        break;
      case '部分封閉':
        tagColor = 'rgba(221, 105, 49, .8)';
        break;
      case '注意':
        tagColor = 'rgba(152, 221, 84, .8)';
        break;
      default:
        tagColor = 'rgba(0,0,0,0)';
        break;
    }
  }
  return (
    <ParallaxView
      backgroundSource={{ uri: props.pic }}
      windowHeight={260}
      header={(
        <View style={styles.header}>
          <View style={styles.headerInfo}>
            {info()}
          </View>
          <Text style={styles.headerTitle}>
              {props.title}
          </Text>
        </View>
      )}
      style={{
        marginTop: 64,
      }}
    >
      {(!!props.status) ?
        (<View style={[styles.statusBlock, { backgroundColor: tagColor }]}>
            <Text style={styles.statusText}>
              {props.status}
            </Text>
          </View>
        ) : null
      }
      <View style={styles.scrollFrame}>
        <View style={{ backgroundColor: 'rgb(246, 246, 246)' }}>
          <View index={0} style={styles.scrollContainer}>
            <View style={styles.articleHeader}>
              <TouchableOpacity onPress={navigate}>
                <MaterialIcon
                  name="near-me"
                  size={18}
                  color={'#000'}
                  style={[styles.menuIcon, styles.favoriteIcon]}
                />
              </TouchableOpacity>
              <Text style={styles.placeText}>
                {props.place}
              </Text>
              <TouchableOpacity>
                <Icon
                  name="heart-o"
                  size={18}
                  color={'#000'}
                  style={[styles.menuIcon, styles.favoriteIcon]}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 14, marginBottom: 20, lineHeight: 25 }}>
              {props.description_01}
            </Text>
            {map()}
            <Text style={{ fontSize: 14, marginBottom: 20, lineHeight: 25 }}>
              {props.description_02 !== 'null' ? props.description_02 : null }
            </Text>
          </View>
        </View>
      </View>
    </ParallaxView>
  );
}

PostDetail.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  pic: React.PropTypes.string,
  detail_01: React.PropTypes.string,
  detail_02: React.PropTypes.string,
  detail_03: React.PropTypes.string,
  detail_04: React.PropTypes.string,
  description_01: React.PropTypes.string,
  description_02: React.PropTypes.string,
  status: React.PropTypes.string,
  recommend: React.PropTypes.string,
  level: React.PropTypes.number,
  place: React.PropTypes.string,
  lat: React.PropTypes.number,
  lon: React.PropTypes.number,
  map: React.PropTypes.string,
  url: React.PropTypes.string,
};

PostDetail.defaultProps = {};

function _injectPropsFromStore(state) {
  return {
    myLat: state.geo.lat,
    myLon: state.geo.lon,
  };
}

const _injectPropsFormActions = {};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostDetail);
