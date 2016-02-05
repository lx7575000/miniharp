var miniHarp = require('miniharp');
var argv = require('minimist')(process.argv.slice(2));


var port = argv.port || 3000;
var root = argv._[0] ? argv._[0] : process.cwd();
var app = miniHarp(root);

console.log('start server in ' + port + ' port');
app.listen(port);
