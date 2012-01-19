#!/bin/bash

echo "Rendering jade to html"
jade index.jade > /dev/null
echo "Transpiling less to css"
lessc style.less > style.css
echo "Packing EcmaScript"
pakmanager build > /dev/null
uglifyjs pakmanaged.js > app.min.js
rm pakmanaged.*

echo "Copying static assets"
rsync -a static/ ../public/

echo "Moving deployment to ../public"
mv index.html style.css app.min.js ../public

echo ""
echo "Done"
