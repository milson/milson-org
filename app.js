(function () {
  "use strict";

  var config = require('./config')
    , connect = require('connect')
    , server
    , middleware = []
    ;

  server = connect.createServer(
      connect.favicon(__dirname + '/public/favicon.ico')
    , connect.static(__dirname + '/public')
    //, connect.bodyParser()
  );

  module.exports = server;
}());
