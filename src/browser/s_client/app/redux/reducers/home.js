import {
  REQUEST_LYRICS,
  REQUEST_LYRICS_SUCCESS,
  REQUEST_LYRICS_ERROR,
  INIT_SOCKET,
  SOCKET_ID,
  SOCKET_LYRIKS,
  IRON_CALLED
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

    case INIT_SOCKET:
      return Object.assign({}, state, {
        type: action.type,
        socket_init: action.init
      });

    case SOCKET_ID:
      return Object.assign({}, state, {
        type: action.type,
        socket_id: action.socket_id
      });

    case SOCKET_LYRIKS:
      return Object.assign({}, state, {
        type: action.type,
        socket_lyriks: action.socket_lyriks
      });

    case IRON_CALLED:
      return Object.assign({}, state, {
        type: action.type
      })

    default:
      return state;
  }
}