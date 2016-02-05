var connect = require('connect');
var url = require('url');
var serveStatic = require('serve-static');
var fs = require('fs');
var path = require('path');

var askJade = require('./lib/processor/jade');


function miniHarp(root){
  var app = connect();
  app.use(function(req, res, next){
    if(req.url === '/current-time'){
      var date = (new Date()).toISOString();
      console.log(date);
      res.end(date);
    }
    console.log('middleware...1');
    next();
  })
  .use(askJade(root))
  .use(serveStatic(root));

  return app;
}

module.exports = miniHarp;
