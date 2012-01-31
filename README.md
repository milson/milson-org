This is the documentation generator which compiles the <http://milson.org> documentation pages.

Scans Directories
===

This will scan `src` and group files by directory.

It will find `yml` files for each `md` file (or read the `yaml` "front matter" header, if found).

All updated meta data is written out to `config.yml`, where the order can be adjusted as desired.
However, customizations to `title` and `filename` must be done to the accompanying `.yml` or "front matter".

Process Overview
===

Implemented

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
