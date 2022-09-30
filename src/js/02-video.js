import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function setTime(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
  console.log(data);
}
const onPlay = function (data) {
  // data is an object containing properties specific to that event

  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (data.seconds !== currentTime) {
    player
      .setCurrentTime(currentTime)
      .then(function (seconds) {
        // seconds = the actual time that the player seeked to
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

          default:
            // some other error occurred
            break;
        }
      });
  }
};

player.on('play', onPlay);
player.on('timeupdate', throttle(setTime, 1000));
