(function () {
  "use strict";

  var YAML = require('json2yaml') // provides `stringify`
    , fs = require('fs')
    , walk = require('walk')
    , markdown = require('markdown').markdown
    , Highlight = require('highlight')
    , forEachAsync = require('forEachAsync')
    , configPath = __dirname + '/config.yml'
    , srcPath = __dirname + '/src'
    , path = require('path')
    , config = {}
    // technically you can backslash and exscape and be stupid
    // but for simplicity:
    // must begin with a-zA-Z
    // may have 0-9_- after the first char
    , cssUnsafeChars = /[^a-zA-Z0-9_-]/g
    , linksJadePath = __dirname + '/src/links.jade'
    , documentsJadePath = __dirname + '/src/documents.jade'
    ;

  YAML.parse = require('yaml').eval;

  function buildJade() {
    var linksJade = []
      , documentsJade = []
      ;

    config.groups.forEach(function (group) {
      if (group.private) {
        return;
      }

      group.title = group.title || group.pathname;
      group.id = group.id || group.pathname.replace(cssUnsafeChars, '_');

      //  li#api_basics_mwrap.menu_major
      //    a(href="#api_basics").top_style API Basics
      //      ul
      linksJade.push("li#" + group.id + "_mwrap.menu_major");
      linksJade.push("  a(href='#" + group.id + "').top_style " + (group.linkTitle || group.title));
      linksJade.push("    ul");

      group.documents.forEach(function (document) {
        if (document.private) {
          return;
        }
      //        li.menu_sub
      //          a(href="#polling") Polling
        linksJade.push("      li.menu_sub");
        linksJade.push("        a(href='#" + document.id + "') " + (document.linkTitle || document.title));
      });
    });
    fs.writeFile(linksJadePath, linksJade.join('\n') + '\n', 'utf8', function (err) {});

    config.groups.forEach(function (group) {
        if (group.private) {
        return;
        }

        //  .cwrapper(data-map="api_basics")
        //    h1#api_basics API Basics
        documentsJade.push(".cwrapper(data-map='" + group.id + "')");
        documentsJade.push("  h1#" + group.id + " " + (group.headerTitle || group.title));

        group.documents.forEach(function (document) {
          if (document.private) {
          return;
          }
          //      #polling.in_menu
          //        h2 Polling
          //        include basics/polling.html
          documentsJade.push("  #" + document.id + ".in_menu");
          documentsJade.push("    h2 " + (document.headerTitle || document.title));
          documentsJade.push("    include " + group.pathname + "/" + document.filename.replace(/\.md$/, '.html'));
      });
    });
    fs.writeFile(documentsJadePath, documentsJade.join('\n') + '\n', 'utf8', function (err) {});
  }

  function writeNewConfigFile(cb) {
    var ymlText
      , deleteGroups = []
      ;

    forEachAsync(config.groups, function (next, group, i) {

      if (!group.documents || !group.documents.length) {
        config.groups[i] = null;
        next();
        return;
      }

      forEachAsync(group.documents, function (next2, file, j) {
        path.exists(srcPath + '/' + group.pathname + '/' + file.filename, function (exists) {
          if (!exists) {
            group.documents[j] = null;
          }

          next2();
        });
      }).then(function () {
        group.documents = group.documents.filter(function (x) {
          return !!x;
        });

        next();
      });

    }).then(function () {
      config.groups = config.groups.filter(function (x) {
        return !!x;
      });

      buildJade();

      ymlText = YAML.stringify(config) + '\n';

      fs.writeFile(configPath, ymlText, 'utf8', function (err) {
        if (err) {
          console.error(err.stack);
        }

        // TODO cb();
      });
    });
  }

  function convertMarkdown(root, stat, next) {
    var fullpath = root + '/' + stat.name
      , groupName
      , newDoc = {
            filename: stat.name
          , title: stat.name.replace(/\.md$/, '')
        }
      ;

    function addToConfig(fileConfig) {
      var foundDoc
        , newConfig
        , foundGroup
        , docList = []
        ;

      groupName = root.slice(srcPath.length + 1);

      newConfig = fileConfig || {};
      newConfig.filename = stat.name;
      newConfig.title = newConfig.title || stat.name.replace(/\.md$/, '');
      newConfig.id = (newConfig.id || newConfig.title).replace(cssUnsafeChars, '_');

      config.groups.some(function (group) {
        if (groupName !== group.pathname) {
          return;
        }

        foundGroup = true;
        docList = group.documents = group.documents || [];
        return true;
      });

      docList.some(function (document, i) {
        if (stat.name !== document.filename) {
          return;
        }

        foundDoc = true;

        // the data in the yml file or frontmatter
        // should be preferred to data in the config
        if (fileConfig) {
          fileConfig.filename = newConfig.filename;
          fileConfig.title = fileConfig.title || newConfig.title;
          fileConfig.id = (fileConfig.id || newConfig.id).replace(cssUnsafeChars, '_');
          docList[i] = fileConfig;
        }

        return true;
      });

      // if there is no config data yet, some reasonable
      // defaults will be added
      if (!foundDoc) {
        docList.push(newConfig);
      }

      if (!foundGroup) {
        config.groups.push({
            pathname: groupName
          , documents: docList
        });
      }
    }

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
        addToConfig(frontMatter);

        text = _text;
        // TODO where are the superflous `\n`s being introduced?
        text = markdown.toHTML(text);
        text = Highlight.highlight(text, '  ', true);
        // TODO
        Object.keys(config.templates).forEach(function (key) {
          var val = config.templates[key]
            ;

          text = text.replace(new RegExp('{{' + key + '}}', 'g'), val);
        });

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

      function getYamlConfigHelper(err, yml) {
        var method = '.yml'
          , fileConfig
          , len
          ;

        // no config file, try for frontmatter
        if (err) {
          yml = readFrontMatter(text);
          method = '.frontmatter'
          // strip frontmatter from text, if any
          // including trailing '---' (which is accounted for by the added '\n')
          if (yml) {
            len = yml.split(/\n/).length;
          } else {
            len = 0;
          }
          text = text.split(/\n/).slice(len).join('\n');
        }

        if (yml) {
          try {
            fileConfig = YAML.parse(yml);
          } catch(e) {
            console.error("Couldn't pares yml for " + fullpath + method);
            console.error(e.stack);
          }
        }

        cb(err, text, fileConfig);
      }

      fs.readFile(fullpath.replace(/\.md$/, '.yml'), 'utf8', getYamlConfigHelper);
    }

    if (!stat.name.match(/\.md$/)) {
      next();
      return;
    }

    fs.readFile(fullpath, 'utf8', markItDown);
  }

  // tricky original array manipulation
  function excludeNodeModules(root, dirs, next) {
    var _dirs
      , dir
      ;

    _dirs = dirs.filter(function (dirname) {
      return !dirname.name.match(/node_modules/);
    });

    // empty the original array
    dirs.splice(0);
    while (dir = _dirs.pop()) {
      dirs.push(dir);
    }

    next();
  }

  function beginWalk() {
    var walker = walk.walk(srcPath)
      ;

    walker.on('file', convertMarkdown);
    walker.on('symbolicLink', convertMarkdown);
    walker.on('directories', excludeNodeModules);
    walker.on('end', writeNewConfigFile);
  }

  function beginWalkOnSuccess(err) {
    if (err) {
      console.error(err);
      return;
    }

    beginWalk();
  }

  function applyConfig(err, text) {
    if (err) {
      //console.error(configPath + ' could not be read.');
      //return;
      text = '---\n  title: Please Change Title\n';
    }

    try {
      config = YAML.parse(text);
    } catch(e) {
      console.error(e.stack);
      config = {};
    }

    config.groups = config.groups || [];
    config.templates = config.templates || {};
    config.languages = config.languages || ['xml', 'bash', 'javascript', 'java', 'cs', 'cpp'];

    Highlight.init(beginWalkOnSuccess, config.languages);
  }

  function readConfig() {
    fs.readFile(configPath, 'utf8', applyConfig);
  }

  readConfig();

}());
