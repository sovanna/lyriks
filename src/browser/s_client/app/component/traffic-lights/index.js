import React from 'react';

import styles from './styles.less';

const remote = require('electron').remote;

export default class TrafficLights extends React.Component {

  handleClose() {
    remote.getCurrentWindow().close();
  }

  handleMinimize() {
    remote.getCurrentWindow().minimize();
  }

  handleFullscreen() {
    remote.getCurrentWindow().setFullScreen(true);
  }

  render() {
    return (
      <div className={`${styles.trafficlights}`}>
        <div className={`${styles.lights}`}>
          <div
              className={`${styles.light} ${styles['light-red']} ${styles.enabled}`}
              onClick={this.handleClose}
          >
          </div>
          <div
              className={`${styles.light} ${styles['light-yellow']} ${styles.enabled}`}
              onClick={this.handleMinimize}
          >
          </div>
          <div
              className={`${styles.light} ${styles['light-green']} ${styles.enabled}`}
              onClick={this.handleFullscreen}
          >
          </div>
        </div>
      </div>
    );
  }
}