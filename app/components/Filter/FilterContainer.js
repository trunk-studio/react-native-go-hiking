import React, {
  View,
  Text,
  PropTypes,
  StyleSheet,
  Image,
} from 'react-native';
import FilterButton from './Button';
import Icon from 'react-native-vector-icons/FontAwesome';
const styles = StyleSheet.create({
  title: {
    paddingLeft: 10,
    padding: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  icon: {
    height: 20,
    width: 20,
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
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={require('../../images/mount.png')} style={ styles.icon } />
        <View style={ styles.title }>
          <Text style={{ color: 'rgb(88, 88, 88)' }}>{props.title}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
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
