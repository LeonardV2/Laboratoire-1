const http = require('http');
const port = 5000;
const server = require('./route.js');
server.listen(port, () => {
  console.log('Listening to port ' + port);
});