import React, {
  View,
  Component,
  ListView,
  Alert,
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import data from '../json/data';
const StyleSheet = require('../utils/F8StyleSheet');
import { calcDistance } from '../utils/place';
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let nearbyData = [];
          data.forEach((post) => {
            const distance = calcDistance(
              post.lat,
              post.lon,
              position.coords.latitude,
              position.coords.longitude
            );
            if (distance <= 100) {
              nearbyData.push({
                ...post,
                distance,
              })
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

  onListItemPress = (rowData) => {
    Alert.alert('', '立即前往', [
      { text: '確認', onPress: () => {
        const lat = this.state.lat;
        const lon = this.state.lon;
        const url = `https://www.google.com.tw/maps/dir/${lat},${lon}/${rowData.lat},${rowData.lon}`;
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          }
        });
      } },
      { text: '取消', onPress: () => {} },
    ]);
  }

  getListItem(rowData, sectionID, rowID) {
    let bakColor = {};
    if (rowID % 2 === 0) {
      bakColor = { backgroundColor: 'rgb(255, 255, 255)' };
    } else {
      bakColor = { backgroundColor: 'rgb(246, 246, 246)' };
    }
    return (
      <ListItem
        id={rowData.id}
        index={rowData.index}
        title={rowData.title}
        img={rowData.pic}
        place={rowData.place}
        status={rowData.status}
        level={rowData.level}
        detail_02={rowData.detail_02}
        description={rowData.description_01}
        onItemPress={this.onListItemPress.bind(this, rowData)}
        distance={rowData.distance}
        bakColor={bakColor}
        rightText={''}
      />
    );
  }

  render() {
    return (
      <View style={styles.content}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.getListItem}
        />
    </View>
    );
  }
}

PostList.propTypes = {};

PostList.defaultProps = {};

function _injectPropsFromStore(state) {
  return {};
}

const _injectPropsFormActions = {};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostList);
