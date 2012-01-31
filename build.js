(function () {
  "use strict";

  var YAML = require('json2yaml') // provides `stringify`
    , fs = require('fs')
    , walk = require('walk')
    , markdown = require('markdown').markdown
    , Highlight = require('highlight')
    , configPath = __dirname + '/config.yml'
    , srcPath = __dirname + '/src'
    , config = {}
    ;

  YAML.parse = require('yaml').eval;

  function writeNewConfigFile() {
    var ymlText
      ;

    ymlText = YAML.stringify(config) + '\n';

    fs.writeFile(configPath, ymlText, 'utf8', function (err) {
      if (err) {
        console.error(err.stack);
      }
    });
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
      // TODO parse YAML front-matter, if any
      
      getYamlConfig(text, function (err, _text, frontMatter) {
        console.log(frontMatter);
        text = _text;
        // TODO where are the superflous `\n`s being introduced?
        text = markdown.toHTML(text);
        text = Highlight.highlight(text, '  ', true);
        // TODO
        // for tpl in config.tpls
        // text = text.replace(new RegExp(key, 'g'), val);
        fs.writeFile(fullpath.replace(/\.md$/, '.html'), text, 'utf8', checkWriteError);
      });
    }

    function readFrontMatter(text) {
      var lines
        , line
        , output
        , padIndent = ''
        ;

      lines = text.split(/\n/);
      line = lines.shift();

      if (!line.match(/^---\s*$/)) {
        return;
      }
      output = '---\n';

      // our yaml parser can't handle objects
      // that start without indentation, so
      // we can add it if this is the case
      if (lines[0] && lines[0].match(/^\S/)) {
        padIndent = '  ';
      }

      while (true) {
        line = lines.shift();

        // unsupported yaml
        if (!line) {
          output = undefined;
          break;
        }

        // end of yaml front-matter
        if (line.match(/^---\s*$/)) {
          break;
        }

        // supported yaml
        output += padIndent + line + '\n'; 
      }

      return output;
    }

    function getYamlConfig(text, cb) {
      fs.readFile(fullpath.replace(/\.md$/, '.yml'), 'utf8', function (err, yml) {
        var method = '.yml'
          , fileConfig
          ;

        if (err) {
          yml = readFrontMatter(text);
          method = '.frontmatter'
          // strip frontmatter from text, if any
          text = text.split(/\n/).slice((yml||'').split(/\n/).length).join('\n');
        }

        if (yml) {
          try {
            fileConfig = YAML.parse(yml);
          } catch(e) {
            console.error("Couldn't pares yml for " + fullpath + method);
            console.error(e.stack);
          }
        }

        cb(err, text, fileConfig || {});
      });
    }

    console.log('name: ', stat.name);
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
      config = YAML.parse(text);
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
