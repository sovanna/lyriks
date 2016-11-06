const fs = require('fs');
const exec = require('child_process').exec;
// const spawn = require('child_process').spawn;
const path = require('path');

const _path_script = path.join(__dirname, './script');

const _child_process = [];

const _startListeningSpotify = () => {
  const _script = path.join(_path_script, '/spotify.sh');


  _child_process.forEach((_child) => {
    _child.kill();
  });

  _child_process.push(exec(`nice -n 19 ${_script}`));

  // exec(`nice -n 19 ${_script}`, (err, stdout, stderr) => {
  //   console.log('err:', err);
  //   console.log('stdout:', stdout);
  //   console.log('stderr:', stderr);
  // });
}

const _startWatchingCurrentSong = (callback) => {
  const _song = path.join(_path_script, 'tmp_current_song.txt');

  let _info;
  let _changing = false;

  fs.watch(_song, {}, (eventType) => {
    let _crs;

    if (_changing) {
      return;
    }

    if (eventType !== 'change') {
      return;
    }

    _crs = fs.createReadStream(_song);

    _crs.on('data', (data) => {
      const _s = data.toString('utf8').trim();

      if (_info !== _s) {
        _changing = true;
        _info = _s;

        callback(_info);
      }
    });

    _crs.on('end', () => {
      _changing = false;
    })
  });
}

module.exports = {
  startListeningSpotify: _startListeningSpotify,
  startWatchingCurrentSong: _startWatchingCurrentSong
};