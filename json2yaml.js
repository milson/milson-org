(function () {
  "use strict";

  var typeOf = require('remedial').typeOf
    , handlers
    , indentLevel = ''
    ;

  handlers = {
      "undefined": function () {
        // ignore
        return 'null';
      }
    , "null": function () {
        return 'null';
      }
    , "number": function (x) {
        return x;
      }
    , "boolean": function (x) {
        return x ? 'true' : 'false';
      }
    , "string": function (x) {
        return x;
      }
    , "array": function (x) {
        x.forEach(function (y) {
          var handler = handlers[typeOf(y)]
            ;

          if (!handler) {
            throw new Error('what the crap: ' + typeOf(y));
          }

           
        });
      }
    , "object": function (x) {
        
      }
    , "function": function () {
        return '[object Function]';
      }
  };
  
}());
