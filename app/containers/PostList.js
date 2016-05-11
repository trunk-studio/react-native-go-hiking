import React, {
  Component,
  StyleSheet,
  View,
  Dimensions,
  SegmentedControlIOS,
} from 'react-native';
import ScrollList from '../components/ScrollList';
import { requestSearchPost } from '../actions/SearchActions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 64,
    height: windowSize.height,
  },
  tabContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: windowSize.width * 0.1,
    paddingRight: windowSize.width * 0.1,
    backgroundColor: 'rgb(131, 206, 227)',
  },
});

export default class PostList extends Component {
  componentWillMount() {
    this.props.requestSearchPost(this.props.mIndex);
    this.setState({ selectedIndex: 0 });
  }
  render() {
    const { listData } = this.props;
    function onListItemPress(detail) {
      Actions.postDetail({
        itemType: detail.type,
        urlKey: detail.urlKey,
        month: detail.month,
        title: detail.crop,
        variety: detail.variety,
        county: detail.county,
      });
    }
    return (
      <View style={styles.wrapper}>
        <View style={styles.tabContainer}>
          <SegmentedControlIOS
            style={styles.tabBar}
            values={['蔬菜', '水果']}
            selectedIndex={0}
            backgroundColor={'white'}
            tintColor={'#359ac0'}
            borderRadius={5}
            onChange={(event) => {
              this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
            }}
          />
        </View>
        <ScrollList
          backgroundColor={'rgb(131, 206, 227)'}
          listData={listData}
          tabIndex={this.state.selectedIndex}
          onItemPress={onListItemPress}
        />
      </View>
    );
  }
}

PostList.propTypes = {
  listData: React.PropTypes.array,
  mIndex: React.PropTypes.number,
  onChange: React.PropTypes.func,
  requestSearchPost: React.PropTypes.func,
};

PostList.defaultProps = {
  listData: [],
  mIndex: 1,
  onChange: null,
  requestSearchPost: null,
};

function _injectPropsFromStore(state) {
  return {
    listData: state.search.postList,
  };
}

const _injectPropsFormActions = {
  requestSearchPost,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostList);
