import React, {
  Component,
  StyleSheet,
  View,
} from 'react-native';
import NewsBoard from '../components/NewsBoard';
import { connect } from 'react-redux';
import { requestNews } from '../actions/SearchActions';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 64,
    marginBottom: 50,
  },
});

export default class News extends Component {
  componentDidMount() {
    this.props.requestNews();
  }
  render() {
    const { listData } = this.props;
    function onListItemPress(detail) {
      Actions.newsDetail({
        newsTitle: detail.title,
        newsContent: detail.content,
      });
    }
    return (
      <View style={styles.wrapper}>
        <NewsBoard boardTitle={'今日舉行的活動'} listData={listData} onItemPress={onListItemPress} />
      </View>
    );
  }
}

News.propTypes = {
  requestNews: React.PropTypes.func,
  listData: React.PropTypes.array,
};

News.defaultProps = {
  listData: [],
};

function _injectPropsFromStore(state) {
  return {
    listData: state.search.newsList,
  };
}

const _injectPropsFormActions = {
  requestNews,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(News);
