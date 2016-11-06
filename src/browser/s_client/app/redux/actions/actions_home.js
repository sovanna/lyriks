import 'isomorphic-fetch';

const _ = require('underscore');
const io = require('socket.io-client');

let _client = null;

import {
  REQUEST_LYRICS,
  REQUEST_LYRICS_SUCCESS,
  REQUEST_LYRICS_ERROR,
  SOCKET_INIT,
  SOCKET_ID,
  SOCKET_LYRIKS,
  IRON_CALLED
} from './actions_type';

function requestLyrics() {
  return {
    type: REQUEST_LYRICS,
    isFetching: true
  };
}

function requestLyricsError(error) {
  return {
    type: REQUEST_LYRICS_ERROR,
    isFetching: false,
    error,
    lyrics: null
  };
}

function ironSearch(title, artist, client_id) {
  return fetch('http://localhost:5001/shit', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json'
    },
    mode: 'no-cors',
    body: JSON.stringify({
      title,
      artist,
      client_id
    })
  })
  .catch(error => {
    return Promise.reject(error);
  });
}

function getLyrics(search, client_id) {
  return dispatch => {
    dispatch(requestLyrics());

    const _search = search.split('|');

    let _title;
    let _artist;

    if (!_search || !_search.length ||_search.length < 2) {
      return Promise.reject('Invalid search');
    }

    _title = _search[0].toLowerCase().trim();
    _artist = _search[1].toLowerCase().trim();

    return ironSearch(_title, _artist, client_id)
      .then(() => {
        return dispatch({ type: IRON_CALLED });
      })
      .catch(error => {
        return dispatch(requestLyricsError(error));
      });
  };
}

function socketInit() {
  return {
    type: SOCKET_INIT,
    socket_init: true
  }
}

function socketRegisterClient(socket_id) {
  return {
    type: SOCKET_ID,
    socket_id
  };
}

function socketReceiveLyrics(socket_lyriks) {
  return {
    type: SOCKET_LYRIKS,
    socket_lyriks
  };
}

function shouldConnectToSocketIO(state) {
  return state.home && !state.home.socket_init;
}

export function getLyricsIfNeeded(search) {
  return (dispatch, getState) => {
    return dispatch(getLyrics(search, getState().home.socket_id));
  };
}

export function socketConnection() {
  return (dispatch, getState) => {
    if (shouldConnectToSocketIO(getState())) {
      _client = io('http://localhost:5002');

      _client.on('register', (ID) => {
        dispatch(socketRegisterClient(ID));
      });

      _client.on('lyriks', (lyriks) => {
        return dispatch(socketReceiveLyrics(lyriks))
      });

      return dispatch(socketInit);
    }

    return Promise.resolve();
  };
}