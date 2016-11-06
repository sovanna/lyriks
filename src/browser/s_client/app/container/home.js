import React from 'react';

import { connect } from 'react-redux';

import Layout from './_layout';

import {
  ipcRenderer
} from 'electron';

import {
  getLyricsIfNeeded,
  socketConnection
} from '../redux/actions/actions_home';

const mapStateToProps = (state) => {
  const _home = state.home;

  return {
    lyrics: _home.socket_lyriks,
    title: _home.title,
    artist: _home.artist
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInit: () => {
      dispatch(socketConnection());
    },

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
    maxHeight: '600px',
    overflow: 'scroll'
  }
}

class Home extends React.Component {

  static get propTypes() {
    return {
      lyrics: React.PropTypes.string,
      title: React.PropTypes.string,
      artist: React.PropTypes.string,
      onInit: React.PropTypes.func,
      onSearchLyrics: React.PropTypes.func
    };
  };

  componentDidMount() {
    this.props.onInit();

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

    const _lyrics_row = lyrics ? lyrics.split('\n').filter((row) => {
      return row !== '\n';
    }) : [];

    return (
      <Layout documentTitle="Home">
        <hgroup style={_STYLE.title}>
          <h1 style={{ fontSize: '14px'}}>{title}</h1>
          <h2 style={{ fontSize: '12px'}}>{artist}</h2>
        </hgroup>

        <div style={_STYLE.content}>
          {_lyrics_row.map((row, key) => {
            return (
              <p key={key}>{row}</p>
            );
          })}
        </div>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);