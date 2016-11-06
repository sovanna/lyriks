import {
  REQUEST_LYRICS,
  REQUEST_LYRICS_SUCCESS,
  REQUEST_LYRICS_ERROR,
  SOCKET_INIT,
  SOCKET_ID,
  SOCKET_LYRIKS,
  IRON_CALLED
} from '../actions/actions_type';

const _initialStateLyrics = {
  type: null,
  isFetching: false,
  error: true,
  title: '',
  artist: '',
  socket_init: false,
  socket_id: null,
  socket_lyriks: null
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

    case SOCKET_INIT:
      return Object.assign({}, state, {
        type: action.type,
        socket_init: action.socket_init
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
      });

    default:
      return state;
  }
}