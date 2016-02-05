var jade = require('jade');
var path = require('path');
var fs = require('fs');


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


function askJade(root){
  return function(req, res, next){
    console.log('middleware...2');
    if(path.extname(req.url) === '.html'){
      var fileUrl = root + req.url;
      if(fs.existsSync(fileUrl)){
        //存在
        var html = fs.readFileSync(fileUrl, {encoding: 'utf-8'});
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.end(html);
      }else{
        //转换jade格式文件
        fileUrl.replace('html', 'jade');
        if(fs.existsSync(fileUrl)){
          res.setHeader('Content-Type', 'text/html; charset=UTF-8');
          res.end(makeJade(fileUrl));
        }
      }
    }
    console.log('no match file in this middleware .....\nso, next()');
    next();
  }
}


module.exports = askJade;
