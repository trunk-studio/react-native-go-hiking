import React, { StyleSheet } from 'react-native';
import SearchBar from 'react-native-search-bar';

const styles = StyleSheet.create({
  searchBar: {
    padding: 30,
    marginBottom: 10,
  },
});

export default function SearchPostBar(props) {
  function _onChangeText(e) {
    props.onChange(e);
  }
  return (
    <SearchBar placeholder={'搜尋'}
      style={styles.searchBar}
      onChangeText={_onChangeText}
      onSearchButtonPress={_onChangeText}
      onCancelButtonPress={_onChangeText}
      barTintColor={'rgb(200, 200, 200)'}
    />
  );
}

SearchPostBar.propTypes = {
  onChange: React.PropTypes.func,
};

SearchPostBar.defaultProps = {
  onChange: null,
};
