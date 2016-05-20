import React, {
  View,
  Component,
  ListView,
  ScrollView,
  Image,
  Text,
  Alert,
  Platform,
} from 'react-native';
import SwipeOut from 'react-native-swipeout';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import { requestPathData } from '../actions/PathDataActions';
import { checkIsFav, requestAddFavorite, requestRemoveFavorite } from '../actions/FavoriteActions';
import { calcDistance } from '../utils/place';
const StyleSheet = require('../utils/F8StyleSheet');
const picNoFavItem = require('../images/no-fav-item.png');
import Spinner from 'react-native-loading-spinner-overlay';
const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 50,
    ios: {
      marginTop: 65,
    },
    android: {
      marginTop: 55,
    },
  },
  picNoFavItem: {
    alignSelf: 'auto',
    // alignItems: 'stretch',
    width: 250,
    height: 177,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNoFavItem: {
    marginTop: 50,
    color: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picContainer: {
    paddingTop: 100,
    flex: 0.8,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
});


export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lon: 0,
      nearbyData: null,
      visible: true,
    };
  }

  componentWillMount() {
    this.props.requestPathData();
    setTimeout(() => {
      this.setState({
        visible: !this.state.visible
      });
    }, 5000);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pathList !== nextProps.pathList) {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
           (position) => {
             const nearbyData = [];
             nextProps.pathList.forEach((post) => {
               const distance = calcDistance(
                 post.lat,
                 post.lon,
                 position.coords.latitude,
                 position.coords.longitude
               );
               if (distance <= 70) {
                 nearbyData.push({
                   ...post,
                   distance,
                 });
               }
             });
             nearbyData.sort((a, b) => {
               return parseFloat(a.distance) - parseFloat(b.distance);
             });
             this.setState({
               nearbyData,
               lat: position.coords.latitude,
               lon: position.coords.longitude,
             });
           },
           (error) => {
             navigator.geolocation.stopObserving();
             // Alert.alert(error.toString());
           },
           { enableHighAccuracy: false, timeout: 20000, maximumAge: 60000 },
         );
        }
      } catch (e) {
        Alert.alert(e.toString());
      }
      if (navigator.geolocation) navigator.geolocation.stopObserving();
    }
  }

  onListItemPress = (rowData) => {
    const pageTitle = Platform.OS === 'ios' ? rowData.title : '步道資訊';
    const newDate = {
      ...rowData,
      title: pageTitle,
      postTitle: rowData.title,
    };
    Actions.postDetail(newDate);
    // Alert.alert('', '立即前往', [
    //   { text: '確認', onPress: () => {
    //     const lat = this.state.lat;
    //     const lon = this.state.lon;
    //     const url = `https://www.google.com.tw/maps/dir/${lat},${lon}/${rowData.lat},${rowData.lon}`;
    //     Linking.canOpenURL(url).then(supported => {
    //       if (supported) {
    //         Linking.openURL(url);
    //       }
    //     });
    //   } },
    //   { text: '取消', onPress: () => {} },
    // ]);
  }

  render() {
    const ListItemArray = [];
    let rowIndex = 0;
    if (!!this.state.nearbyData) {
      for (const rowData of this.state.nearbyData) {
        let bakColor = {};
        if (rowIndex % 2 === 0) {
          bakColor = { backgroundColor: 'rgb(255, 255, 255)' };
        } else {
          bakColor = { backgroundColor: 'rgb(246, 246, 246)' };
        }
        rowIndex += 1;

        let tagColor;
        switch (rowData.status) {
          case '全線封閉':
            tagColor = 'rgb(213, 64, 64)';
            break;
          case '部分封閉':
            tagColor = 'rgb(221, 105, 49)';
            break;
          case '注意':
            tagColor = '#D9CE3E';
            break;
          default:
            tagColor = 'rgba(0,0,0,0)';
            break;
        }

        const swipeoutBtns = [];
        if (!rowData.isFav) {
          swipeoutBtns.push(
            {
              text: '收藏',
              backgroundColor: 'rgb(79, 164, 89)',
              onPress: this.props.requestAddFavorite.bind(this, rowData.id),
            },
          );
        } else {
          swipeoutBtns.push(
            {
              text: '取消收藏',
              backgroundColor: 'rgb(231, 48, 43)',
              onPress: this.props.requestRemoveFavorite.bind(this, rowData.id),
            },
          );
        }

        ListItemArray.push(
          <SwipeOut right={swipeoutBtns} autoClose key={rowData.id}>
            <ListItem
              id={rowData.id}
              index={rowData.index}
              title={rowData.title}
              img={rowData.cover}
              place={rowData.place}
              status={rowData.status}
              tagColor={tagColor}
              level={rowData.level}
              detail_02={rowData.detail_02}
              description={null}
              onItemPress={this.onListItemPress.bind(this, rowData)}
              distance={rowData.distance}
              bakColor={bakColor}
              rightText={''}
              />
          </SwipeOut>
        );
      }
    }

    let contentChildren = null;
    if (this.state.nearbyData === null) {
      // contentChildren = <View />;
      contentChildren = (
         <View style={styles.picContainer}>
          <Image
            source={picNoFavItem}
            style={styles.picNoFavItem}
          />
          <Text style={styles.textNoFavItem}>
            目前您附近沒有任何步道 :p
          </Text>
        </View>
      );
    } else if (ListItemArray.length > 0) {
      contentChildren = ListItemArray;
    }

    return (
      <View style={styles.content}>
        <Spinner visible={this.state.visible} />
        <ScrollView>
          { contentChildren }
        </ScrollView>
      </View>
    );
  }
}

PostList.propTypes = {
  requestAddFavorite: React.PropTypes.func,
  requestRemoveFavorite: React.PropTypes.func,
  requestPathData: React.PropTypes.func,
};

PostList.defaultProps = {};

function _injectPropsFromStore(state) {
  return {
    pathList: state.pathList,
  };
}

const _injectPropsFormActions = {
  requestAddFavorite,
  requestRemoveFavorite,
  requestPathData,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostList);
