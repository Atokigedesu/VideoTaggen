const { execFile } = require('child_process');
const express = require('express');
const fs = require('fs');

const app = express();
app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', (req, res) => {
  const srcUrl = req.query.src;
  res.render('index', { srcUrl });
});

app.get('/cache', (req, res) => {
  const srcUrl = req.query.src;
  const encodedUrl = encodeURIComponent(srcUrl);
  const cacheRoot = `${__dirname}/public/cache`;
  if (!/^https?:\/\//.test(srcUrl)) {
    res.sendStatus(404);
    return;
  }
  if (fs.existsSync(`${cacheRoot}/${encodedUrl}`)) {
    res.sendStatus(200);
  } else {
    if (!fs.existsSync(`${cacheRoot}/.${encodedUrl}`)) {
      execFile(`${__dirname}/cache.sh`, [srcUrl, encodedUrl], (err, stdout, stderr) => {
        if (err) { throw err; }
        console.log(stdout);
        console.error(stderr);
      });
    }
    res.sendStatus(202);
  }
});

app.listen(8888);
