import React from 'react';

import { connect } from 'react-redux';

import Layout from './_layout';

import {
  ipcRenderer
} from 'electron';

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

class Home extends React.Component {

  constructor(props) {
    super(props);

    ipcRenderer.on('spotify:song', (event, song) => {
      console.log(`spotify:song:${song}`);
    });
  }

  render() {
    return (
      <Layout documentTitle="Home">
        {'Hello Home'}
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);