import React, { View, PropTypes, StyleSheet } from 'react-native';
import ListItem from './ListItem';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function PostList(props) {
  const { listData } = props;
  const listItemArray = [];
  if (listData.length > 0) {
    listData.forEach((item, i) => {
      listItemArray.push(
        <ListItem
          key={i}
          title={item.title}
          img={item.pic}
          description={item.distance !== -1 ? `${item.distance} km` : ''}
          onItemPress={props.onItemPress}
        />
      );
    });
  }
  return (
    <View style={styles.list}>
      {listItemArray}
    </View>
  );
}

PostList.propTypes = {
  listData: PropTypes.array,
  onItemPress: PropTypes.func,
};

PostList.defaultProps = {
  listData: [],
  onItemPress: () => {},
};
