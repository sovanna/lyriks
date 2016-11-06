import {
  REQUEST_LYRICS,
  REQUEST_LYRICS_SUCCESS,
  REQUEST_LYRICS_ERROR,
} from '../actions/actions_type';

const _initialStateLyrics = {
  type: null,
  isFetching: false,
  error: true,
  lyrics: null,
  title: '',
  artist: ''
};

export default function home(state = _initialStateLyrics, action) {
  switch (action.type) {

    case REQUEST_LYRICS:
      return Object.assign({}, state, {
        type: action.type,
        isFetching: true
      });

    case REQUEST_LYRICS_ERROR:
      return Object.assign({}, state, {
        type: action.type,
        isFetching: false,
        error: action.error,
        lyrics: null
      });

    case REQUEST_LYRICS_SUCCESS:
      return Object.assign({}, state, {
        type: action.type,
        isFetching: false,
        error: null,
        lyrics: action.lyrics,
        title: action.title,
        artist: action.artist
      });

    default:
      return state;
  }
}