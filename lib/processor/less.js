var less = require('less');
var path = require('path');
var fs = require('fs');


function makeLess(root){
  return function processLess(req, res, next){
    if(path.extname(req.url) === '.css'){
      var fileUrl = root + req.url;
      if(fs.existsSync(fileUrl)){
          var css = fs.readFileSync(fileUrl, {encoding: 'utf-8'});
          res.setHeader('Content-Type', 'text/css; charset=UTF-8');
          res.end(css);
      }else{
        fileUrl.replace('css', 'less');
        if(fs.existsSync(fileUrl)){
          var css = fs.readFileSync(fileUrl, {encoding: 'utf-8'});
          res.setHeader('Content-Type', 'text/css; charset=UTF-8');
          less.render(css, function(err, output){
            if(err){
              throw err;
            }
            res.end(output);
          });
        }
      }
    }
    next();
  };
}



module.exports = makeLess;
