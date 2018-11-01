#!/usr/bin/env node

// Ensure works in MacOS
var fs = require('fs');
console.log(fs.realpathSync(process.argv[2]));
