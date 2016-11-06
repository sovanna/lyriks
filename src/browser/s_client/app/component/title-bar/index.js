import React from 'react';

import TrafficLights from '../traffic-lights';

const STYLE = {
  titlebar: {
    borderBottom: '1px solid #2a2a2a',
    display: 'flex',
    top: '0',
    transition: 'opacity 0.3s ease',
    width: '100%',
    WebkitAppRegion: 'drag',
    zIndex: '2'
  }
};

export default class TitleBar extends React.Component {

  static get propTypes() {
    return {
      height: React.PropTypes.string,
      style: React.PropTypes.object
    };
  }

  static get defaultProps() {
    return {
      height: '45px',
      style: {}
    };
  }

  render() {
    const {
      height,
      style
    } = this.props;

    return (
      <header style={Object.assign({}, STYLE.titlebar, { height }, style)}>
        <TrafficLights />
      </header>
    );
  }
}