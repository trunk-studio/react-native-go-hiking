import React, {
  View,
  Component,
  ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import SwipeOut from 'react-native-swipeout';
import Filter from '../components/Filter/FilterContainer';
import { requestPathData } from '../actions/PathDataActions';
import { checkIsFav, requestAddFavorite, requestRemoveFavorite } from '../actions/FavoriteActions';
import { requestFilterArea, requestFilterType } from '../actions/SearchActions';

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
    };
  }

  componentWillMount() {
    this.props.requestPathData();
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.nowTab === 'tabList') {
      this.renderList(nextProps);
    }
    if ( nextProps.nowTab === 'tabList' && (
      this.props.pathList !== nextProps.pathList ||
      this.props.typeIndex !== nextProps.typeIndex ||
      this.props.areaIndex !== nextProps.areaIndex)) {
      this.renderList(nextProps);
    }
  }

  onListItemPress = (rowData) => {
    Actions.postDetail(rowData);
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
          img={rowData.pic}
          place={rowData.place}
          status={rowData.status}
          tagColor={tagColor}
          level={rowData.level}
          detail_02={rowData.detail_02}
          description={rowData.description_01}
          onItemPress={this.onListItemPress.bind(this, rowData)}
          bakColor={bakColor}
          rightText={''}
        />
      </SwipeOut>
    );
  }

  areaOnChange = (id) => {
    this.props.requestFilterArea(id);
  };
  typeOnChange = (id) => {
    this.props.requestFilterType(id);
  };

  renderList = (nextProps) => {
    const area = [
      { title: '全部' },
      { title: '北部' },
      { title: '中部' },
      { title: '南部' },
      { title: '東部' },
    ];
    const type = [
      { title: '全部' },
      { title: '郊山' },
      { title: '中級山', width: 65 },
      { title: '百岳' },
    ];
    let filterAreaPostList = [];
    if (area[nextProps.areaIndex].title !== '全部') {
      nextProps.pathList.forEach((post) => {
        if (post.zone === area[nextProps.areaIndex].title) {
          filterAreaPostList.push(post);
        }
      });
    } else {
      filterAreaPostList = [...nextProps.pathList];
    }
    let postList = [];
    if (type[nextProps.typeIndex].title !== '全部') {
      filterAreaPostList.forEach((post) => {
        if (post.postType === type[nextProps.typeIndex].title) {
          postList.push(post);
        }
      });
    } else {
      postList = [...filterAreaPostList];
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(postList),
    });
  }

  render() {
    const area = [
      { title: '全部' },
      { title: '北部' },
      { title: '中部' },
      { title: '南部' },
      { title: '東部' },
    ];
    const type = [
      { title: '全部' },
      { title: '郊山' },
      { title: '中級山', width: 65 },
      { title: '百岳' },
    ];
    return (
      <View style={styles.content}>
        <Filter
          title={'區域'}
          dataList={area}
          active={this.props.areaIndex}
          onChange={this.areaOnChange}
        />
        <Filter
          title={'類型'}
          dataList={type}
          active={this.props.typeIndex}
          onChange={this.typeOnChange}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.getListItem}
          ref={'ListView'}
          enableEmptySections
        />
    </View>
    );
  }
}

PostList.propTypes = {
  requestAddFavorite: React.PropTypes.func,
  checkIsFav: React.PropTypes.func,
  requestPathData: React.PropTypes.func,
  requestRemoveFavorite: React.PropTypes.func,
  requestFilterArea: React.PropTypes.func,
  requestFilterType: React.PropTypes.func,
  typeIndex: React.PropTypes.number,
  areaIndex: React.PropTypes.number,
  nowTab: React.PropTypes.string,
};

PostList.defaultProps = {};

function _injectPropsFromStore(state) {
  return {
    nowTab: state.router.nowTab,
    pathList: state.pathList,
    typeIndex: state.search.typeIndex,
    areaIndex: state.search.areaIndex,
  };
}

const _injectPropsFormActions = {
  requestAddFavorite,
  checkIsFav,
  requestPathData,
  requestRemoveFavorite,
  requestFilterArea,
  requestFilterType,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostList);
