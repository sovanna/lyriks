const fs = require('fs');
const exec = require('child_process').exec;
const path = require('path');

const _startListeningSpotify = () => {
  const _script = path.join(__dirname, '../script', 'spotify.sh');

  exec(`nice -n 19 ${_script}`, (err, stdout, stderr) => {
    console.log('err:', err);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  });
}

const _startWatchingCurrentSong = (callback) => {
  const _song = path.join(__dirname, '../script', 'tmp_current_song.txt');

  let _info;

  fs.watch(_song, {}, (eventType) => {
    let _crs;

    if (eventType !== 'change') {
      return;
    }

    _crs = fs.createReadStream(_song);

    _crs.on('data', (data) => {
      const _s = data.toString('utf8').trim();

      if (_info !== _s) {
        _info = _s;

        callback(_info);
      }
    });
  });
}

module.exports = {
  startListeningSpotify: _startListeningSpotify,
  startWatchingCurrentSong: _startWatchingCurrentSong
};