import React, {
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import ListItem from './ListItem';

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  defaultTxt: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default function ScrollList(props) {
  const { listData } = props;
  const listContainer = [];
  if (listData.length > 0) {
    listData.forEach((post, i) => {
      if (props.tabIndex === 0 && post.type === '蔬菜'
        || props.tabIndex === 1 && post.type === '水果') {
        listContainer.push(
          <ListItem
            key={i}
            index={i}
            urlKey={post.key}
            type={post.type}
            month={post.month}
            crop={post.title}
            variety={post.variety}
            county={post.county}
            onItemPress={props.onItemPress}
          />
        );
      }
    });
  }
  return (
    <ScrollView
      keyscrollEventThrottle={200}
      backgroundColor={props.backgroundColor}
      style={styles.container}
    >
      {listContainer.length > 0 ? listContainer : <Text style={styles.defaultTxt}>沒有資料囉！</Text>}
    </ScrollView>
  );
}

ScrollList.propTypes = {
  listData: React.PropTypes.array,
  onItemPress: React.PropTypes.func,
  tabIndex: React.PropTypes.number,
  backgroundColor: React.PropTypes.string,
};

ScrollList.defaultProps = {
  listData: [],
};
