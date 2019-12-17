#!/usr/bin/env node

const yargs = require('yargs');

const pullDay = require('./lib/pull-day');
const pullRange = require('./lib/pull-range');

function outputOptions(yargs) {
  yargs.option('output', {
    alias: 'o',
    demandOption: true,
    description: 'Output file or directory'
  });
}

const args = yargs
  .command('pull-day [date]', 'pull a day', outputOptions, pullDay)
  .command('pull <startdate> <enddate>', 'pull a range of dates', outputOptions, pullRange)
  .argv;

if (!args._.length) {
  yargs.showHelp();
}
