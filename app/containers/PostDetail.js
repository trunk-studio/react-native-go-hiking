import React, {
  Image,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  Component,
  Platform,
  BackAndroid,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import CoverCard from '../components/CoverCard';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import ParallaxView from 'react-native-parallax-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { checkIsFav, requestAddFavorite, requestRemoveFavorite } from '../actions/FavoriteActions';
import LightBox from 'react-native-lightbox';
const StyleSheet = require('../utils/F8StyleSheet');
const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  parallaxView: {
    //遮掉地圖下方的商標文字
    marginBottom: -15,
  },
  title: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: '500',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  placeText: {
    fontSize: 18,
    color: '#709D2A',
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
    // ios: {
    //   marginTop: 65,
    // },
    // android: {
    //   marginTop: 55,
    // },
  },
  underline: {
    backgroundColor: 'rgb(79, 164, 89)',
    height: 5,
  },
  scrollFrame: {
    flex: 1,
    flexDirection: 'column',
    //paddingBottom: 25,
  },
  scrollContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
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
    android: {
      marginTop: 110,
    },
    ios: {
      paddingTop: 120,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowColor: 'black',
      shadowOpacity: 1.0,
    },
  },
  statusBlock: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolButton: {
    flexDirection: 'row',
    paddingLeft: 6,
    paddingRight: 6,
    alignItems: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  imgSrcBlock: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    padding: 2,
  },
  imgSrcText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#EEE',
    fontStyle: 'italic',
    ios: {
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowColor: 'black',
      shadowOpacity: 1.0,
    },
  },
});

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFav: props.isFav,
    };
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', function () {
      Actions.pop();
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress');
  }

  onImageSrcBtn = () => {
    Actions.webViewPage({
      url: this.props.url,
      title: this.props.title,
    });
  }

  info = () => {
    const infos = [];
    if (this.props.level) {
      // let star = '';
      // for (let i = 0; i < this.props.level; i++) {
      //   star += '★';
      // }
      let levelImgSrc = '';
      switch (this.props.level) {
        case 1:
          levelImgSrc = 'http://i.imgur.com/B24J6K2.png';
          break;
        case 2:
          levelImgSrc = 'http://i.imgur.com/bC8Fs5H.png';
          break;
        case 3:
          levelImgSrc = 'http://i.imgur.com/0SkdW5R.png';
          break;
        case 4:
          levelImgSrc = 'http://i.imgur.com/6R9jsvO.png';
          break;
        case 5:
          levelImgSrc = 'http://i.imgur.com/OlqyR2d.png';
          break;
        default:
          levelImgSrc = '';
          break;
      }
      infos.push(
        <View key={'level'} style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            source={{ uri: levelImgSrc }}
            style={{
              width: 80,
              height: 15,
            }}
          />
        </View>
      );
    }
    if (this.props.detail_02 !== 'null') {
      infos.push(
        <Text
          style={styles.infoText}
          key={'detail_02'}
        >
          {this.props.detail_02}
        </Text>
      );
    }
    return infos;
  }

  map = () => {
    const imgWidth = windowSize.width;
    const imgHeight = parseInt(imgWidth / 16.0 * 9.0);

    let map = (
      <LightBox>
        <Image
          resizeMode="contain"
          source={{ uri: this.props.map }}
          style={{
            flex: 1,
            padding: 20,
            width: imgWidth,
            height: imgHeight,
          }}
        />
      </LightBox>
    );
    if (Platform.OS === 'android') {
      if (Platform.Version < 21) {
        map = (
          <Image
            resizeMode="contain"
            source={{ uri: this.props.map }}
            style={{
              flex: 1,
              padding: 20,
              width: imgWidth,
              height: imgHeight,
            }}
          />
        );
      }
    }

    let mapImg;
    if (this.props.map !== 'null') {
      mapImg = (
        <View style={{ flex: 1 }}>
          {map}
        </View>
      );
    }
    return mapImg;
  }

  gmap = () => {
    const imgWidth = windowSize.width;
    const imgHeight = parseInt(imgWidth / 16.0 * 9.0, 10);

    return (
      <TouchableOpacity onPress={this.navigate} style={{ paddingTop: 20 }}>
        <Image
          resizeMode="cover"
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${this.props.lat},${this.props.lon}&zoom=14&size=${imgWidth}x${imgHeight}&scale=2&maptype=hybrid&markers=color:red%7Clabel:S%7C${this.props.lat},${this.props.lon}&key=AIzaSyBiwSQUTr6brsJoPHcliZ3TVFYgYf7ulbw` }}
          style={{
            flex: 1,
            width: imgWidth,
            height: imgHeight,
          }}
        />
      </TouchableOpacity>
    );
  }

  navigate = () => {
    Alert.alert('立即前往', '導航僅供參考', [
      { text: '確認', onPress: () => {
        const url = `https://www.google.com.tw/maps/dir/${this.props.myLat},${this.props.myLon}/${this.props.lat},${this.props.lon}`;
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          }
        });
      } },
      { text: '取消', onPress: () => {} },
    ]);
  }

  favorite = () => {
    if (this.state.isFav) {
      this.props.requestRemoveFavorite(this.props.id);
    } else {
      this.props.requestAddFavorite(this.props.id);
    }
    this.setState({
      isFav: !this.state.isFav,
    });
  }

  linkToSrc = (url) => {
    Actions.webViewPage({
      url,
      title: this.props.title,
    });
    // Linking.canOpenURL(url).then(supported => {
    //   if (supported) {
    //     Linking.openURL(url);
    //   }
    // });
  }


  render() {
    let tagColor = '';
    if (this.props.status !== 'null') {
      switch (this.props.status) {
        case '全線封閉':
          tagColor = 'rgba(213, 64, 64, .8)';
          break;
        case '部分封閉':
          tagColor = 'rgba(221, 105, 49, .8)';
          break;
        case '注意':
          tagColor = '#D9CE3E';
          break;
        default:
          tagColor = 'rgba(0,0,0,0)';
          break;
      }
    }

    let toolbar = (
      <View>
        <View index={0} style={styles.scrollContainer}>
          <View style={styles.toolbar}>
            <TouchableOpacity onPress={this.navigate} style={styles.toolButton}>
              <MaterialIcon
                name="near-me"
                size={26}
                color={'#709D2A'}
                style={[styles.menuIcon, styles.favoriteIcon]}
              />
              <Text style={styles.placeText}>
                {this.props.place}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.favorite} style={styles.toolButton}>
              <Icon
                name={ this.state.isFav ? 'heart' : 'heart-o' }
                size={24}
                color={'#709D2A'}
                style={[styles.menuIcon, styles.favoriteIcon]}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 14, marginBottom: 20, lineHeight: 25 }}>
            {this.props.description_01}
          </Text>
        </View>
        <View style={{ marginBottom: 18, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ padding: 5, paddingLeft: 10, paddingRight: 10, backgroundColor: '#709D2A', borderRadius: 5 }}
            onPress={this.onImageSrcBtn}
          >
            <Text style={{ fontSize: 16, color: '#FFF' }}>檢視完整步道介紹</Text>
          </TouchableOpacity>
        </View>
        {this.map()}
        {this.gmap()}
      </View>
    );
    if (Platform.OS === 'android') {
      if (Platform.Version < 21) {
        toolbar = (
            <View
              index={0}
              style={[
                styles.scrollContainer,
              { backgroundColor: 'rgba(0, 0, 0, 0)' },
              ]}
            >
              <TouchableOpacity onPress={this.navigate} style={[styles.toolButton, {position: 'absolute', right: 40,}]}>
                <MaterialIcon
                  name="near-me"
                  size={26}
                  color={'#709D2A'}
                  style={[styles.menuIcon, styles.favoriteIcon]}
                />
                <Text style={styles.placeText}>
                  {this.props.place}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.favorite} style={[styles.toolButton, {position: 'absolute', right: 5}]}>
                <Icon
                  name={ this.state.isFav ? 'heart' : 'heart-o' }
                  size={24}
                  color={'#709D2A'}
                  style={[styles.menuIcon, styles.favoriteIcon]}
                />
              </TouchableOpacity>
            <Text style={{ marginTop: 34, fontSize: 14, marginBottom: 20, lineHeight: 25 }}>
              {this.props.description_01}
            </Text>
            <TouchableOpacity
              style={{
                width: 150,
                marginLeft: 100,
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: '#709D2A',
                borderRadius: 5,
              }}
              onPress={this.onImageSrcBtn}
            >
              <Text style={{ fontSize: 16, color: '#FFF' }}>檢視完整步道介紹</Text>
            </TouchableOpacity>
          {this.map()}
          {this.gmap()}
        </View>
        );
      }
    }

    return (
      <ParallaxView
        backgroundSource={{ uri: `https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/hiking/prod/images/cover/${this.props.id}/${this.props.id}_l.jpg` }}
        windowHeight={260}
        header={(
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              {this.info()}
            </View>
            <Text style={styles.headerTitle}>
                {this.props.postTitle}
            </Text>
            <TouchableOpacity onPress={this.linkToSrc.bind(this, this.props.coverSourceUrl)} style={styles.imgSrcBlock}>
              <Text style={styles.imgSrcText}>
                圖片來源：{this.props.coverSourceName} #{this.props.id}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.parallaxView}
      >
        <View style={styles.scrollFrame}>
          {(this.props.status !== 'null') ?
            (
              <View style={[styles.statusBlock, { backgroundColor: tagColor }]}>
                <Text style={styles.statusText}>
                  {this.props.status}
                </Text>
              </View>
            ) : (
              <View style={styles.underline} />
            )
          }
          {toolbar}
          </View>
      </ParallaxView>
    );
  }
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
  requestAddFavorite: React.PropTypes.func,
  requestRemoveFavorite: React.PropTypes.func,
  isFav: React.PropTypes.bool,
  cover: React.PropTypes.string,
  coverSourceUrl: React.PropTypes.string,
  coverSourceName: React.PropTypes.string,
  myLat: React.PropTypes.number,
  myLon: React.PropTypes.number,
};

PostDetail.defaultProps = {
};

function _injectPropsFromStore(state) {
  return {
    myLat: state.geo.lat,
    myLon: state.geo.lon,
  };
}

const _injectPropsFormActions = {
  requestAddFavorite,
  requestRemoveFavorite,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostDetail);
