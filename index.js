#!/usr/bin/env node

'use strict';
var inquirer = require('inquirer');
var _ = require('lodash');
var fuzzy = require('fuzzy');
var path = require('path');

inquirer.registerPrompt('autocomplete', require('./autocomplete'));

var args = process.argv;
// The args passed in is a array of absolute paths of cheatsheets
var cheatsheets = args.slice(2);
var mappings = {};

cheatsheets = cheatsheets.map((el) => {
   var shortName = path.basename(el).split('.')[0];
   mappings[shortName] = el;
   return shortName;
});

function searchCheatsheet (answers, rawInput) {
   var input = rawInput || '';

   return new Promise(((resolve) => {
      setTimeout(() => {
         var fuzzyResult = fuzzy.filter(input, cheatsheets);
         resolve(
            fuzzyResult.map((el) => el.original)
         );
      }, _.random(30, 500));
   }));
}

inquirer
   .prompt([
      {
         type: 'autocomplete',
         name: 'cheatsheet',
         suggestOnly: false,
         message: 'which cheatsheet to open?',
         source: searchCheatsheet,
         pageSize: 6
      }
   ])
   .then((answer) => {
      console.error(mappings[answer.cheatsheet]);
   });

process.on('SIGINT', () => {
   console.log();
   process.exit();
});
