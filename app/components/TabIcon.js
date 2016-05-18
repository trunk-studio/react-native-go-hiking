import React, {
  StyleSheet,
  Text,
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
    lineHeight: 15,
    fontSize: 20,
  },
});

export default function TabIcon(props) {
  return (
    <Text
      style={{
        color: props.selected ? 'rgb(79, 164, 89)' : 'rgba(83, 83, 82, 1)',
        textAlign: 'center',
        paddingTop: 6,
      }}
    >
      <Icon name={props.iconName} style={ styles.icon } />{"\n"}
      <Text style={ styles.tabTitle }>{ props.title }</Text>
    </Text>
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
