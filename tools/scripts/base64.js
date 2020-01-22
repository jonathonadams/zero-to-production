const process = require('process');

console.log(Buffer.from(process.argv[2]).toString('base64'));
