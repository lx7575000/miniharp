var jade = require('jade');
var path = require('path');
var fs = require('fs');


function makeJade(root){
  var html = jade.renderFile(root);
  console.log(html);
  return html;
}

function askJade(root){
  return function(req, res, next){
    // console.log('middleware...2');
    if(path.extname(req.url) === '.html'){
      var fileUrl = root + req.url;
      if(fs.existsSync(fileUrl)){
        //存在
        var html = fs.readFileSync(fileUrl, {encoding: 'utf-8'});
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        res.writeHead(200, {
          'Content-Type' : 'text/html',
          'Content-Length': html.length
        });
        res.end(html);
      }else{
        //转换jade格式文件
        fileUrl.replace('html', 'jade');
        if(fs.existsSync(fileUrl)){
          // res.statusCode = 200;
          // res.setHeader('Content-Type', 'text/html; charset=UTF-8');
          res.writeHead(200, {
            'Content-Type' : 'text/html',
            'Content-Length': 0
          });
          res.end(makeJade(fileUrl));
        }
      }
    }
    // console.log('no match file in this middleware .....\nso, next()');
    next();
  }
}


module.exports = askJade;
