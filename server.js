var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./config/webpack.dev');
var authenticate = require('./routes/authenticate');
var socialMemoryApi = require('./Routes/SocialMemoryApi');
var bodyParser = require('body-parser');

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 3000;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));
// Routers

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
