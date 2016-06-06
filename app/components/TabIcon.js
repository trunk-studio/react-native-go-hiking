import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'rgba(83, 83, 82, 0.25)',
  },
  tabTitle: {
    fontSize: 9,
    fontWeight: '400',
    letterSpacing: 1,
  },
  icon: {
    fontSize: 20,
    paddingBottom: 3,
  },
});

export default function TabIcon(props) {
  const color =  props.selected ? 'rgb(79, 164, 89)' : 'rgba(83, 83, 82, 1)';
  return (
    <View style={{ position: 'absolute', top: -30, left: -25, justifyContent: 'center', alignItems: 'center', width: 50 }}>
      <Icon name={props.iconName} style={[styles.icon, { color }]} />
      <Text allowFontScaling={false} style={[styles.tabTitle, { color }]}>{ props.title }</Text>
    </View>
  );
}

TabIcon.propTypes = {
  title: React.PropTypes.string,
  iconName: React.PropTypes.string,
  selected: React.PropTypes.bool,
};

TabIcon.defaultProps = {
  selected: false,
};
