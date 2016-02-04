var jade = require('jade');
var path = require('path');

function makeJade(root){
  var html = jade.renderFile(root);
  console.log(html);
  return html;
}

function processJade(req, res, next){
  var extname = path.extname(req.url);

  if(extname === '.html'){
    var dirname = path.dirname(req.url);
    var basename = path.basename(req.url, '.html'); //foo

    var html = makeJade(dirname + '/' +basename + '.jade');
    return html;
  }else if(extname === '.jade'){
    var html = makeJade(req.url);
    return html;
  }
  next();
}

module.exports = processJade;
