import React, {
  Component,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { requestPathData } from '../actions/PathDataActions';
import { checkIsFav, requestRemoveFavorite } from '../actions/FavoriteActions';
import SwipeOut from 'react-native-swipeout';
import ListItem from '../components/PostList/ListItem';
const StyleSheet = require('../utils/F8StyleSheet');
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    ios: {
      marginTop: 64,
      marginBottom: 50,
    },
    android: {
      marginTop: 54,
    },
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    ios: {
      marginTop: 65,
    },
    android: {
      marginTop: 55,
    },
  },
});


export default class MyFavorite extends Component {

  componentWillMount() {
    this.props.requestPathData();
  }

  onListItemPress = (rowData) => {
    Actions.postDetail(rowData);
  }

  render() {
    const ListItemArray = [];
    const favoriteList = [];
    for (const item of this.props.pathList) {
      if (item.isFav) {
        favoriteList.push(item);
      }
    }
    let rowIndex = 0;
    for (const rowData of favoriteList) {
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
          tagColor = 'rgb(152, 221, 84)';
          break;
        default:
          tagColor = 'rgba(0,0,0,0)';
          break;
      }

      const swipeoutBtns = [
        {
          text: '取消收藏',
          backgroundColor: 'rgb(231, 48, 43)',
          onPress: this.props.requestRemoveFavorite.bind(this, rowData.id),
        },
      ];

      ListItemArray.push(
        <SwipeOut right={swipeoutBtns} autoClose key={rowData.id}>
          <ListItem
            id={rowData.id}
            index={rowData.index}
            title={rowData.title}
            img={rowData.pic}
            place={rowData.place}
            status={rowData.status}
            tagColor={tagColor}
            level={rowData.level}
            detail_02={rowData.detail_02}
            onItemPress={this.onListItemPress.bind(this, rowData)}
            bakColor={bakColor}
            rightText={''}
          />
      </SwipeOut>);
    }
    return (
      <ScrollView style={styles.content}>
        {ListItemArray}
      </ScrollView>
    );
  }
}

MyFavorite.propTypes = {
  requestRemoveFavorite: React.PropTypes.func,
  onListItemPress: React.PropTypes.func,
  requestPathData: React.PropTypes.func,
  pathList: React.PropTypes.array,
};

MyFavorite.defaultProps = {};

function _injectPropsFromStore(state) {
  return {
    pathList: state.pathList,
  };
}

const _injectPropsFormActions = {
  checkIsFav,
  requestRemoveFavorite,
  requestPathData,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(MyFavorite);