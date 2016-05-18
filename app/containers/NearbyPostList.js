import React, {
  View,
  Component,
  ListView,
  Alert,
  Linking,
} from 'react-native';
import SwipeOut from 'react-native-swipeout';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import { requestPathData } from '../actions/PathDataActions';
import { checkIsFav, requestAddFavorite, requestRemoveFavorite } from '../actions/FavoriteActions';
import { calcDistance } from '../utils/place';
const StyleSheet = require('../utils/F8StyleSheet');
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
});


export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.getListItem = this.getListItem.bind(this);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource,
      lat: 0,
      lon: 0,
    };
  }

  componentWillMount() {
    this.props.requestPathData();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.pathList !== nextProps.pathList) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let nearbyData = [];
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
            })
            nearbyData.sort((a, b) => {
              return parseFloat(a.distance) - parseFloat(b.distance);
            });
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(nearbyData),
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {},
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
      }
    }
  }

  onListItemPress = (rowData) => {
    Actions.postDetail(rowData);
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

  getListItem(rowData, sectionID, rowID) {
    let bakColor = {};
    if (rowID % 2 === 0) {
      bakColor = { backgroundColor: 'rgb(255, 255, 255)' };
    } else {
      bakColor = { backgroundColor: 'rgb(246, 246, 246)' };
    }
    let tagColor;
    switch (rowData.status) {
      case '全線封閉':
        tagColor = 'rgb(213, 64, 64)';
        break;
      case '部分封閉':
        tagColor = 'rgb(221, 105, 49)';
        break;
      case '注意':
        tagColor = 'rgb(152, 221, 84)';
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
          backgroundColor: 'rgb(152, 221, 84)',
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

    return (
      <SwipeOut right={swipeoutBtns} autoClose >
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

  render() {
    return (
      <View style={styles.content}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.getListItem}
          enableEmptySections
        />
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
