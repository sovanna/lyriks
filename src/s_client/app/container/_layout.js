import React from 'react';

import { connect } from 'react-redux';

import DocumentTitle from 'react-document-title';

import TitleBar from '../component/title-bar';

import {
  APP_NAME
} from '../component/__constants';

import '../static/styles/main.less';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

class Layout extends React.Component {

  static get propTypes() {
    return {
      documentTitle: React.PropTypes.string,
      documentTitleOverride: React.PropTypes.bool,
      children: React.PropTypes.node
    };
  }

  static get defaultProps() {
    return {
      documentTitleOverride: false
    };
  }

  constructor(props) {
    super(props);

    this._documentTitle = this.props.documentTitle;

    if (!this._documentTitle) {
      this._documentTitle = APP_NAME;
    } else {
      this._documentTitle = `${APP_NAME} | ${this._documentTitle}`;
    }

    if (this.props.documentTitleOverride) {
      this._documentTitle = this.props.documentTitle;
    }
  }

  render() {
    return (
      <DocumentTitle title={this._documentTitle}>
        <div>
          <TitleBar />

          <div>
            {this.props.children}
          </div>

        </div>
      </DocumentTitle>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
