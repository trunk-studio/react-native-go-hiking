import React, {
  View,
  Component,
  ListView,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ListItem from '../components/PostList/ListItem';
import data from '../json/data';
const styles = React.StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#fff',
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
    console.log("!!!!!!!!!!!!!!", data);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    });
  }

  onListItemPress = (id) => {
    Actions.postDetail({ id });
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
        description={`${rowData.description_01.substring(0, 50)}...`}
        onItemPress={this.onListItemPress}
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
