// スペースキーで 再生 or 一時停止 を切り替える
document.addEventListener('keypress', event => {
  if (event.key !== ' ') return;
  document.querySelector('.plyr').plyr.togglePlay();
});

// ダブルクリックでフルスクリーンを切り替える
document.addEventListener('dblclick', () => {
  document.querySelector('.plyr').plyr.toggleFullscreen();
});
