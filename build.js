(function () {
  "use strict";

  var yaml = require('yaml')
    , fs = require('fs')
    , walk = require('walk')
    , markdown = require('markdown').markdown
    , Highlight = require('highlight')
    , configPath = __dirname + '/config.yml'
    , srcPath = __dirname + '/src'
    , config = {}
    ;

  function writeNewConfigFile() {
    var text = ''
      ;

    console.log('foooo:', config);
    Object.keys(config).forEach(function (key) {
      var val = config[key]
        ;

      
    });

    console.log(config);
  }

  function convertMarkdown(root, stat, next) {
    var fullpath = root + '/' + stat.name
      ;

    function checkWriteError(err) {
      if (err) {
        console.error(err.stack);
        return;
      }

      next();
    }

    function markItDown(err, text) {
      if (err) {
        console.error(err.stack);
        return;
      }
      
      // TODO where are the superflous `\n`s being introduced?
      text = markdown.toHTML(text);
      text = Highlight.highlight(text, '  ', true);
      text = text.replace(/${SPOTTER}/g, 'remote.spotterrf.com:7772');
      fs.writeFile(fullpath.replace(/\.md$/, '.html'), text, 'utf8', checkWriteError);
    }

    console.log(stat.name);
    if (!stat.name.match(/\.md$/)) {
      next();
      return;
    }

    fs.readFile(fullpath, 'utf8', markItDown);
  }

  function beginWalk() {
    var walker = walk.walk(srcPath)
      ;

    console.log(srcPath);
    walker.on('file', convertMarkdown);
    walker.on('end', writeNewConfigFile);
  }

  function readConfig() {
    function applyConfig(err, text) {
      if (err) {
        //console.error(configPath + ' could not be read.');
        //return;
        text = '---\n  title: foo';
      }

      console.log('barish:', text);
      config = yaml.eval(text);
      console.log('stuperfoo:', config);
      beginWalk();
    }

    fs.readFile(configPath, 'utf8', applyConfig);
  }

  Highlight.init(function (err) {
    if (err) {
      console.error(err);
      return;
    }

    readConfig();
  }, ['xml', 'bash', 'javascript', 'java', 'cs', 'cpp']);

/*
  * reads in `config.yml`
  * walks the `src` directory structure
  * for each file
    * if file ends in `.md`
      * if file exists in `config.yml`, load presets
      * if file of same name, but ending in `yml` exsits
        * read in yml
        * replace presets, if any
      * if no presets, use defaults (filename, replace special chars)
      * if not exists in `config.yml`, append to end of list
*/

}());
