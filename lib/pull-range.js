'use strict';

const moment = require('moment');
const path = require('path');

const pullDay = require('./pull-day');

async function pullRange(argv) {
  let current = moment.utc(argv.startdate);
  const end = moment.utc(argv.enddate);
  while (!current.isAfter(end)) {
    const date = current.format('YYYY-MM-DD');
    await pullDay({
      ...argv,
      date,
      output: path.resolve(argv.output, `${date}.txt`)
    });
    current = current.add(1, 'd');
  }
}

module.exports = pullRange;
