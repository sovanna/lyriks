const fs = require('fs');
const spawn = require('child_process').spawn;
const path = require('path');

const _path_script = path.join(__dirname, './script');

const _child_process = [];

const _startListeningSpotify = () => {
  const _oascript = `${_path_script}/spotify.sh`;

  _child_process.forEach((_child) => {
    _child.kill();
  });

  _child_process.push(spawn('nice', ['-n', '20', _oascript]));
}

const _startWatchingCurrentSong = (callback) => {
  const _song_file = `${_path_script}/tmp_current_song.txt`;

  let _current_music;
  let _changing = false;

  fs.watch(_song_file, {}, (eventType) => {
    let _stream_file;

    if (_changing) {
      return;
    }

    if (eventType !== 'change') {
      return;
    }

    _stream_file = fs.createReadStream(_song_file);

    _stream_file.on('data', (data) => {
      const _song = data.toString('utf8').trim();

      if (_current_music && _current_music !== _song) {
        _changing = true;
        _current_music = _song;

        callback(_current_music);
      }
    });

    _stream_file.on('end', () => {
      _changing = false;
    })
  });
}

function onExit() {
  _child_process.forEach((_child) => {
    _child.kill();
  });
}

process.on('exit', onExit);
process.on('SIGINT', onExit);
process.on('uncaughtException', onExit);

module.exports = {
  startListeningSpotify: _startListeningSpotify,
  startWatchingCurrentSong: _startWatchingCurrentSong
};