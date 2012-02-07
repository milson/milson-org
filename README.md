# MILSON Documentation

This repository contains the website for the MILSON documentation site.


## Installation

You will need to install several NPM modules to use this:

    sudo npm install -g node-markdown markdown jade less highlight-cli

## Running the Server

    ./build.sh
    spark

## Pushing to Live Site

    git checkout master
    # make edits, build, test, commit
    git status
    # make sure that the working directory is clean (apart from public/)
    git checkout gh-pages
    rsync -avhP --exclude='public' public/ ./
    # add the modified files (probably just index.html)
    git add index.html
    git commit -m "updated live site to latest"
