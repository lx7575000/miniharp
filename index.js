var connect = require('connect');
var url = require('url');
var serveStatic = require('serve-static');
var fs = require('fs');
var path = require('path');

var askJade = require('./lib/processor/jade');
var makeLess = require('./lib/processor/less');

function miniHarp(root){
  var app = connect();
  app.use(function(req, res, next){
    if(url.parse(req.url).path === '/'){
      req.url += 'index.html';
    }
    next();
  })
  .use(function(req, res, next) {
    var extname = path.extname(req.url);
    if(extname === '.jade' || extname === '.less'){
      res.statusCode = 404;
      res.end('Not Found ' + req.url);
    }
    next();
  })
  .use(askJade(root))
  .use(makeLess(root))
  .use(serveStatic(root));


  return app;
}

module.exports = miniHarp;
