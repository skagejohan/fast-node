var restify = require('restify');
var React = require('react');
var ReactDOM = require('react-dom/server');
var port = process.env.port || 8080;

// Views
var indexModule = require('./components/index');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

function index(req, res, next){
  var props = {};
  var indexComponent = React.createElement(indexModule, props);
  var rendered = ReactDOM.renderToStaticMarkup(indexComponent);

  res.send(rendered);
  next();
}

var server = restify.createServer();
server.get('/', index);
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
