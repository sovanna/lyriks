import React from 'react';

import { connect } from 'react-redux';

import Layout from './_layout';

import {
  ipcRenderer
} from 'electron';

import {
  getLyricsIfNeeded
} from '../redux/actions/actions_home';

const mapStateToProps = (state) => {
  let _lyrics = state.home.lyrics;

  if (_lyrics) {
    try {
      _lyrics = _lyrics.message.body.lyrics.lyrics_body;
      _lyrics = _lyrics.replace(/\*+\sThis\sLyrics\sis\sNOT\sfor\sCommercial\suse\s\*+/gi, '');
      _lyrics = _lyrics.replace(/\(\d+\)/gi, '');
    } catch (e) {
      console.error(e);
      _lyrics = null;
    }
  }

  return {
    lyrics: _lyrics,
    title: state.home.title,
    artist: state.home.artist
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchLyrics: (search) => {
      dispatch(getLyricsIfNeeded(search));
    }
  };
};

const _STYLE = {
  title: {
    textAlign: 'center'
  },
  content: {
    textAlign: 'center',
    margin: '20px 30px',
    padding: '10px',
    fontSize: '14px',
    maxHeight: '100%',
    overflow: 'scroll'
  }
}

class Home extends React.Component {

  static get propTypes() {
    return {
      lyrics: React.PropTypes.string,
      title: React.PropTypes.string,
      artist: React.PropTypes.string,
      onSearchLyrics: React.PropTypes.func
    };
  };

  componentDidMount() {
    ipcRenderer.on('spotify:song', (event, song) => {
      if (this.props.onSearchLyrics) {
        this.props.onSearchLyrics(song);
      }
    });
  }

  render() {
    const {
      lyrics,
      title,
      artist
    } = this.props;

    return (
      <Layout documentTitle="Home">
        <hgroup style={_STYLE.title}>
          <h1 style={{ fontSize: '14px'}}>{title}</h1>
          <h2 style={{ fontSize: '12px'}}>{artist}</h2>
        </hgroup>

        <p style={_STYLE.content}>
          {lyrics}
        </p>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);