#!/bin/bash
#SRC_DIR=${1}
#BLD_DIR=${2}
SRC_DIR=src/
BLD_DIR=public/

if [ ! -e "node_modules" ]
then
  echo "Installing modules..."
  npm install
  # TODO by slowly moving these all to build.js, the global CLI versions won't be needed
  npm install -g yaml2json json2yaml uglify-js pakmanager jade less node-markdown markdown highlight-cli
fi

echo "Converting markdown to annotated html..."
node build.js ${SRC_DIR}
jade "${SRC_DIR}/index.jade" > /dev/null

if [ ! -e "${SRC_DIR}/package.json" ]
then
  echo "FAILED"
  echo "run 'npm init' in ${SRC_DIR} to create the client application and run the build again"
  exit 1
fi
mkdir -p "${BLD_DIR}/docs/latest"
rm -rf "${BLD_DIR}/docs/latest/*"
mv "${SRC_DIR}/index.html" "${BLD_DIR}/docs/latest"
find "${SRC_DIR}/" -iname '*.html' -exec rm {} \;

echo "Converting less to css..."
touch "${SRC_DIR}/style.less"
lessc "${SRC_DIR}/style.less" > "${BLD_DIR}/docs/latest/style.css"
rsync -avP "${SRC_DIR}/static/" "${BLD_DIR}/docs/latest/" > /dev/null

echo "Building client app..."
mkdir -p "${SRC_DIR}/lib"
mkdir -p "${SRC_DIR}/static"
cd "${SRC_DIR}/"
  pakmanager build >/dev/null 2>/dev/null
  uglifyjs pakmanaged.js > pakmanaged.min.js
  rm "pakmanaged.html"
  mv pakmanaged.* "../${BLD_DIR}/docs/latest/"
cd - > /dev/null

echo "Done"
