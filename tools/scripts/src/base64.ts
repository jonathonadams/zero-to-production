#!/usr/bin/env node
import * as process from 'process';

const inputParam = process.argv[2];
if (inputParam) {
  process.stdout.write(base64(inputParam));
}

function base64(string: string) {
  return Buffer.from(string).toString('base64');
}
