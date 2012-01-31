This is the documentation generator which compiles the <http://milson.org> documentation pages.

Installation
===

  0. Install NodeJS (<http://nodejs.org>)

  0. Install and build the example project

        bash build.sh

How it Works
===

  0. You put your header, footer, logo, etc in `src/index.jade` 
  0. You put articles in `src/some-group-name/`, `src/some-other-group-name`, etc
  0. When you run `node build.js`
    * The `*.md` files in `src/some-group-name` are turned into annotated `.html`
      * you can change which languages should be annotated in `config.yml.languages`
    * `config.yml` is auto-updated every time you `node build.js`
      * If `src/my-group/my-doc.md` has YAML front matter, or `src/my-group/my-doc.yml` exsits, the defaults are overridden with that data
    * you can change the order in which groups and documents appear by changing their order in `config.yml`
      * even though it auto-updates, the order you specify will be preserved
    * `src/links.jade` and `src/documents.jade` will be produced from the directory scan
    * `src/index.jade` will be built to contain ALL of the documents

Scans Directories
===

This will scan `src` and group files by directory.

It will find `yml` files for each `md` file (or read the `yaml` "front matter" header, if found).

All updated meta data is written out to `config.yml`, where the order can be adjusted as desired.
However, customizations to `title` and `filename` must be done to the accompanying `.yml` or "front matter".

Process Overview
===

Implemented *
Not Implemented -

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
  - compile jade files
  - remove remnant html
