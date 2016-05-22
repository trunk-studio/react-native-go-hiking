import React, {
  View,
  Component,
  ListView,
  ScrollView,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import SimpleListItem from '../components/PostList/SimpleListItem';
import SwipeOut from 'react-native-swipeout';
import Filter from '../components/Filter/FilterContainer';
import { requestPathData } from '../actions/PathDataActions';
import { checkIsFav, requestAddFavorite, requestRemoveFavorite } from '../actions/FavoriteActions';
import { requestFilterArea, requestFilterType } from '../actions/SearchActions';
import Spinner from 'react-native-loading-spinner-overlay';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

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
  filterContainer: {
    backgroundColor: '#567354',
    marginTop: -1,
    paddingTop: 5,
    paddingBottom: 2,
  },
});


export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.getListItem = this.getListItem.bind(this);
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource,
      postList: [],
      visible: false,
      canLoadMoreContent: true,
    };
  }

  componentWillMount() {
    // loading indicator
    this.setState({ visible: true });
  }

  componentDidMount() {
    this.props.requestPathData();

    setTimeout(() => {
      this.setState({ visible: false });
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    // if ( nextProps.nowTab === 'tabList' || nextProps.nowTab === 'postList' ) {
    //   this.renderList(nextProps);
    // }
    if (this.props.pathList !== nextProps.pathList ||
      this.props.typeIndex !== nextProps.typeIndex ||
      this.props.areaIndex !== nextProps.areaIndex) {
      this.renderList(nextProps);
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

    // give different listItem component to android version < 21.
    let listItem = [];
    listItem = (
      <SwipeOut key={rowData.id} right={swipeoutBtns} autoClose >
        <SimpleListItem
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
          bakColor={bakColor}
          rightText={''}
        />
      </SwipeOut>
    );
    if (Platform.OS === 'android') {
      if (Platform.Version < 21) {
        listItem = (
          <SimpleListItem
            id={rowData.id}
            index={rowData.index}
            title={rowData.title}
            img={rowData.cover}
            place={rowData.place}
            status={rowData.status}
            tagColor={tagColor}
            onItemPress={this.onListItemPress.bind(this, rowData)}
            bakColor={bakColor}
            rightText={''}
          />
        );
      }
    }
    return (listItem);
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
      for (let i = 0; i < nextProps.pathList.length; i++) {
        if (nextProps.pathList[i].zone === area[nextProps.areaIndex].title) {
          filterAreaPostList.push(nextProps.pathList[i]);
        }
      }
    } else {
      filterAreaPostList = [...nextProps.pathList];
    }
    let postList = [];
    if (type[nextProps.typeIndex].title !== '全部') {
      for (let i = 0; i < filterAreaPostList.length; i++) {
        if (filterAreaPostList[i].postType === type[nextProps.typeIndex].title) {
          postList.push(filterAreaPostList[i]);
        }
      }

    } else {
      postList = [...filterAreaPostList];
    }
    const newPostList = [...postList];
    const dataSource = newPostList.splice(0, 5);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(dataSource),
      postList,
      canLoadMoreContent: true,
    });
  }

  renderScrollViewListItem = () => {
    const ListItemArray = this.state.postList.map((post, i) => {
      return this.getListItem(post, 0, i);
    });
    return ListItemArray;
  }

  loadMorePost = () => {
    let postList = [...this.state.postList];
    const dataSource = postList.splice(0, this.state.dataSource.getRowCount() + 10);
    let canLoadMoreContent = true;
    if (postList.length === 0) {
      canLoadMoreContent = false;
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(dataSource),
      canLoadMoreContent,
    });
  }

  render() {
    const area = [
      { title: '全部區域' },
      { title: '北部' },
      { title: '中部' },
      { title: '南部' },
      { title: '東部' },
    ];
    const type = [
      { title: '全部類型' },
      { title: '郊　山' },
      { title: '中級山', width: 65 },
      { title: '百　岳' },
    ];
    return (
      <View style={styles.content}>
        <Spinner visible={this.state.visible} />
        <View style={styles.filterContainer}>
          <Filter
            title={'類型'}
            dataList={type}
            active={this.props.typeIndex}
            onChange={this.typeOnChange}
            activeColor={'#fff'}
            textColor={'#567354'}
            />
          <Filter
            title={'區域'}
            dataList={area}
            active={this.props.areaIndex}
            onChange={this.areaOnChange}
            activeColor={'#fff'}
            textColor={'#567354'}
          />
        </View>
        <ListView
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          dataSource={this.state.dataSource}
          renderRow={this.getListItem}
          canLoadMore={this.state.canLoadMoreContent}
          onLoadMoreAsync={this.loadMorePost}
          distanceToLoadMore={500}
        />
        {/*<ScrollView>
          {this.renderScrollViewListItem()}
        </ScrollView>*/}
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
