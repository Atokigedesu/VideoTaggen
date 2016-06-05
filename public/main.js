const player = plyr.setup()[0];

// スペースキーで 再生 or 一時停止 を切り替える
document.addEventListener('keypress', event => {
  if (event.key !== ' ') return;
  player.togglePlay();
});

// ダブルクリックでフルスクリーンを切り替える
document.addEventListener('dblclick', event => {
  player.toggleFullscreen();
});
