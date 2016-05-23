import React, { PropTypes } from 'react';
import { DefaultRenderer } from 'react-native-router-flux';
const propTypes = {
  navigationState: PropTypes.object,
};

export default class NavigationDrawer extends React.Component {
  render() {
    const children = this.props.navigationState.children;
    return (
      <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
    );
  }
}

NavigationDrawer.propTypes = propTypes;

export default NavigationDrawer;
