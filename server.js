var https = require('https');
var fs = require('fs');
var static = require('node-static');
var file = new static.Server('./public');

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}

https.createServer(options, function(req, res) {
  file.serve(req, res);
}).listen(8080);

console.log('Server running on port 8080');
