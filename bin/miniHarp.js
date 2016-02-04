var miniHarp = require('miniharp');
var argv = require('minimist')(process.argv.slice(2));
var app = miniHarp();

var port = argv.port || 3000;

console.log('start server in ' + port + ' port');

app.listen(port);
