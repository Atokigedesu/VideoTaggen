const express = require('express');

const app = express();

app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', (req, res) => {
  const srcUrl = decodeURIComponent(req.query.src);

  res.render('index', { srcUrl });
});

app.listen(8888);
