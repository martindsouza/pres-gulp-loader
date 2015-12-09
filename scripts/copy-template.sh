#!/bin/bash

DIR_SCRIPT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DIR_CUR=$(pwd)

cp -r $DIR_SCRIPT/../template/ .
npm install
git submodule add https://github.com/hakimel/reveal.js
