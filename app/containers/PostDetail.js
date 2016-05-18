import React, {
  Image,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  Component,
} from 'react-native';
import CoverCard from '../components/CoverCard';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
import ParallaxView from 'react-native-parallax-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { checkIsFav, requestAddFavorite, requestRemoveFavorite } from '../actions/FavoriteActions';
const StyleSheet = require('../utils/F8StyleSheet');
const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  parallaxView: {
    ios: {
      marginTop: 64,
    },
    android: {
      marginTop: 55,
    },
  },
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
    fontSize: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolButton: {
    marginRight: 10,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -22,
  },
});


class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFav: props.isFav,
    };
  }

  info = () => {
    const infos = [];
    if (this.props.level) {
      let star = '';
      for (let i = 0; i < this.props.level; i++) {
        star += '★';
      }
      infos.push(<Text style={styles.infoText} key={'level'}>難易度：{star}</Text>);
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
    let mapImg;
    if (this.props.map !== 'null') {
      mapImg = (
        <View style={{ flex: 1, marginBottom: 20 }}>
          <Image
            source={{ uri: this.props.map }}
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
          tagColor = 'rgba(152, 221, 84, .8)';
          break;
        default:
          tagColor = 'rgba(0,0,0,0)';
          break;
      }
    }
    return (
      <ParallaxView
        backgroundSource={{ uri: this.props.pic }}
        windowHeight={260}
        header={(
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              {this.info()}
            </View>
            <Text style={styles.headerTitle}>
                {this.props.title}
            </Text>
          </View>
        )}
        style={styles.parallaxView}
      >
        {(this.props.status !== 'null') ?
          (<View style={[styles.statusBlock, { backgroundColor: tagColor }]}>
              <Text style={styles.statusText}>
                {this.props.status}
              </Text>
            </View>
          ) : null
        }
        <View style={styles.scrollFrame}>
          <View style={{ backgroundColor: 'rgb(246, 246, 246)' }}>
            <View index={0} style={styles.scrollContainer}>
              <View style={styles.articleHeader}>
                <Text style={styles.placeText}>
                  {this.props.place}
                </Text>
              </View>
              <View style={styles.toolbar}>
                <TouchableOpacity onPress={this.navigate} style={styles.toolButton}>
                  <MaterialIcon
                    name="near-me"
                    size={24}
                    color={'#709D2A'}
                    style={[styles.menuIcon, styles.favoriteIcon]}
                    />
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
              {this.map()}
              {/*
              <Text style={{ fontSize: 14, marginBottom: 20, lineHeight: 25 }}>
                {props.description_02 !== 'null' ? props.description_02 : null }
              </Text>
              */}
            </View>
          </View>
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
