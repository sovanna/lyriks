import React from 'react';

import { connect } from 'react-redux';

import Layout from './_layout';

import {
  ipcRenderer
} from 'electron';

import {
  getLyricsIfNeeded,
  sockethor
} from '../redux/actions/actions_home';

const mapStateToProps = (state) => {
  // if (_lyrics) {
  //   try {
  //     _lyrics = _lyrics.message.body.lyrics.lyrics_body;
  //     _lyrics = _lyrics.replace(/\*+\sThis\sLyrics\sis\sNOT\sfor\sCommercial\suse\s\*+/gi, '');
  //     _lyrics = _lyrics.replace(/\(\d+\)/gi, '');
  //   } catch (e) {
  //     console.error(e);
  //     _lyrics = null;
  //   }
  // }

  return {
    lyrics: state.home.socket_lyriks,
    title: state.home.title,
    artist: state.home.artist
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInit: () => {
      dispatch(sockethor());
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

    let _lyrics;

    if (lyrics) {
      _lyrics = lyrics.replace(/\n/gi, '<br />')
    }

    return (
      <Layout documentTitle="Home">
        <hgroup style={_STYLE.title}>
          <h1 style={{ fontSize: '14px'}}>{title}</h1>
          <h2 style={{ fontSize: '12px'}}>{artist}</h2>
        </hgroup>

        <p style={_STYLE.content} dangerouslySetInnerHTML={{__html: _lyrics}} />
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);