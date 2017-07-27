// スペースキーで 再生 or 一時停止 を切り替える
document.addEventListener('keypress', event => {
  if (event.key !== ' ') return;
  document.querySelector('.plyr').plyr.togglePlay();
});

// ダブルクリックでフルスクリーンを切り替える
document.addEventListener('dblclick', () => {
  document.querySelector('.plyr').plyr.toggleFullscreen();
});

// キャッシュ済みファイルがあれば、そちらに乗り換える
const encodedUrl = encodeURIComponent(window.VideoTaggenSrcUrl);
fetch(`/cache?src=${encodedUrl}`)
  .then(res => {
    if (res.status === 200) {
      const doubleEncodedUrl = encodeURIComponent(encodedUrl);
      const cachedSrc = encodeURIComponent(`/cache/${doubleEncodedUrl}`);
      location.href = `/?src=${cachedSrc}`;
    }
  })
  ;
