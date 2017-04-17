class VideoHandler {
  constructor() {
    this.video = document.querySelector('img#video');
    this.isPlaying = false;
    this.timeout = 1000;
    this.timer = null;

    this.video.onerror = this._onError.bind(this);
    this.video.onload = this._onLoad.bind(this);

    this._reload();
  }

  _onError() {
    this._resetTimer();
  }

  _onLoad() {
    this.isPlaying = false;
    this._resetTimer();
  }

  _resetTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this._reload.bind(this), this.timeout);
  }

  _reload() {
    this.isPlaying = false;
    this.video.src = 'http://192.168.0.206:8080/?action=stream#' + Date.now();
  }
}