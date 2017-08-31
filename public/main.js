const elem = document.querySelector('.player');
const player = plyr.setup(elem, {
  autoplay: true,
  controls: [
    "rewind",
    "play",
    "fast-forward",
    "progress",
    "current-time",
    "mute",
    "volume",
    "fullscreen"
  ],
  seekTime: 30
})[0];

const mc = new Hammer.Manager(elem, {
  recognizers: [
    [Hammer.Tap],
    [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]
  ]
});

mc.on('tap', (event) => {
  if (event.tapCount !== 2) return;
  player.toggleFullscreen();
});

mc.on('swipeleft' , () => player.rewind(10));
mc.on('swiperight', () => player.forward(10));
