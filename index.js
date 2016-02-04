var connect = require('connect');
var url = require('url');
var serveStatic = require('serve-static');



function miniHarp(root){
  var app = connect();
  app.use(function(req, res, next){
    if(req.url === '/current-time'){
      var date = (new Date()).toISOString();
      console.log(date);
      res.end(date);
    }
    console.log('middleware...');
    next();
  })
  .use(serveStatic(__dirname + '/'));
  console.log('start miniharp....');
  return app;
}

module.exports = miniHarp;
