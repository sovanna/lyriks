import React from 'react';

import { connect } from 'react-redux';

import Layout from './_layout';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

class Home extends React.Component {
  render() {
    return (
      <Layout documentTitle="Home">
        {'Hello Home'}
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);