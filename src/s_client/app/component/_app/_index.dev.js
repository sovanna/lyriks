import React from 'react';

import DevTools from '../__devtools';

export default class App extends React.Component {

  static get propTypes() {
    return {
      children: React.PropTypes.element
    };
  }

  render() {
    const {
      children
    } = this.props;

    return (
      <div>
        {children}
        <DevTools />
      </div>
    );
  }
}