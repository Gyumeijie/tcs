#! /bin/bash

if [ ! -d ~/.cheatsheets ]; then mkdir ~/.cheatsheets; fi

function generateEntries () {
   echo $(find ~/.cheatsheets/entries -type f 2>/dev/null) 
}

function main() {
   local install_path=$(which tcs)
   local dir=$(dirname $(realpath $install_path))
   ${dir}/index.js $(generateEntries) 2>~/.cheatsheets/stderr
  
   entry=$(cat ~/.cheatsheets/stderr)
   
   if [ ! "$entry" = "" ]; then
      cat $entry | less
   fi
}

main