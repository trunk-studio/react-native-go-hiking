import React, {
  View,
  Component,
  ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import data from '../json/data';
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
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
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
