#!/bin/bash

jade index.jade
lessc style.less > style.css
pakmanager build
uglifyjs pakmanaged.js > app.min.js

rsync -a static/ ../public/

mv index.html style.css app.min.js ../public
