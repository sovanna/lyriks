import 'whatwg-fetch';

const got = require('got');
const _ = require('underscore');

import {
  REQUEST_LYRICS,
  REQUEST_LYRICS_SUCCESS,
  REQUEST_LYRICS_ERROR,
} from './actions_type';

import {
  MUSIXMATCH_API_URL,
  MUSIXMATCH_API_KEY
} from './actions_tool';

function requestLyrics() {
  return {
    type: REQUEST_LYRICS,
    isFetching: true
  };
}

function requestLyricsSuccess(lyrics, title, artist, track_id) {
  return {
    type: REQUEST_LYRICS_SUCCESS,
    isFetching: false,
    error: false,
    lyrics,
    title,
    artist,
    track_id
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

function musixmatch_search(search, title, artist) {
  return got.get(`${MUSIXMATCH_API_URL}track.search`, {
    json: true,
    query: {
      f_has_lyrics: 1,
      q_track: title,
      q_artist: artist,
      apikey: MUSIXMATCH_API_KEY,
      format: 'json'
    }
  })
  .then((response) => {
    let _body;
    let _track;

    try {
      _body = response.body.message.body.track_list;
    } catch (e) {
      return Promise.reject(e);
    }

    _track = _.find(_.map(_body, track => {
      return track.track;
    }), (track) => {
      const _current_track = track.track_name.toLowerCase().trim();
      const _track_search = search.split('|')[0].toLowerCase().trim();

      return _current_track === _track_search;
    });

    if (!_track) {
      _track = _body[0];
    }

    return Promise.resolve(_track);
  })
  .catch(error => {
    return Promise.reject(error);
  });
}

function musixmatch_lyrics(track_id) {
  return got.get(`${MUSIXMATCH_API_URL}track.lyrics.get`, {
    json: true,
    query: {
      track_id: track_id,
      apikey: MUSIXMATCH_API_KEY
    }
  })
  .then(response => {
    return Promise.resolve(response.body);
  })
  .catch(error => {
    return Promise.reject(error);
  });
}

function getLyrics(search) {
  return dispatch => {
    dispatch(requestLyrics());

    const _search = search.split('|');
    const _url = `${MUSIXMATCH_API_URL}track.search`;

    if (!_search || !_search.length ||_search.length < 2) {
      return Promise.reject('Invalid search');
    }

    return musixmatch_search(search, _search[0], _search[1])
      .then(track => {
        return musixmatch_lyrics(track.track_id)
          .then(response => {
            return dispatch(requestLyricsSuccess(response, _search[0], _search[1], track.track_id));
          })
          .catch(error => {
            return dispatch(requestLyricsError(error));
          });
      })
      .catch(error => {
        return dispatch(requestLyricsError(error));
      });
  };
}

export function getLyricsIfNeeded(search) {
  return (dispatch, getState) => {
    return dispatch(getLyrics(search));
  };
}