(function () {
  "use strict";

  var yaml = require('yaml')
    , fs = require('fs')
    , yamlText = fs.readFileSync('config.yml', 'utf8')
    , yamlObj
    ;

  yamlObj = yaml.eval(yamlText);
  console.log(yamlObj);

}());
