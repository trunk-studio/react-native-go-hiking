import React, {
  View,
  Text,
  TouchableOpacity,
  PropTypes,
  StyleSheet
} from 'react-native';
import FilterButton from './Button';
const styles = StyleSheet.create({
  title:{
    paddingLeft: 10,
    padding: 3,
  },
  container: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
});

export default function FilterContainer(props) {
  function onChange(id) {
    props.onChange(id);
  }
  function genbutton() {
    const buttons = props.dataList.map((item, i) => {
      const width = item.width || null;
      return (
        <FilterButton
          key={item.title}
          index={i}
          text={item.title}
          width={width}
          active={i === props.active}
          onPress={onChange}
        />
      );
    });
    return buttons;
  }
  return (
    <View>
      <View style={ styles.title }>
        <Text style={{ color: 'rgb(88, 88, 88)' }}>{props.title}</Text>
      </View>
      <View style={styles.container}>
        {genbutton()}
      </View>
    </View>
  );
}

FilterContainer.propTypes = {
  title: PropTypes.string,
  dataList: PropTypes.array,
  active: PropTypes.number,
  onChange: PropTypes.func,
};

FilterContainer.defaultProps = {
  title: '',
  dataList: [],
  active: 1,
  onChange: () => {},
};
