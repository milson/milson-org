(function () {
  "use strict";

  var connect = require('connect')
    , server
    ;

  server = connect.createServer(
      connect.favicon(__dirname + '/public/favicon.ico')
    , connect.static(__dirname + '/public')
    , connect.directory(__dirname + '/public')
  );

  module.exports = server;
}());
