import React from 'react';

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
      </div>
    );
  }
}