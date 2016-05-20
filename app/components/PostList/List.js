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
  return (
    <View style={styles.list}>
      {
        listData.map(function(item) {
          <ListItem
            key={i}
            title={item.title}
            img={item.cover}
            description={item.distance !== -1 ? `${item.distance} km` : ''}
            onItemPress={props.onItemPress}
          />
        });
      }
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
