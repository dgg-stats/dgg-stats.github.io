'use strict';

const writeStream = require('fs-write-stream-atomic');
const moment = require('moment');
const logs = require('overrustle-logs');
const through = require('through2');

function pullDay(argv) {
  return new Promise((resolve) => {
    const w = writeStream(argv.output);
    w.on('close', resolve);
    
    console.log(`Pulling ${argv.date}...`);

    logs({
      channel: 'Destinygg',
      date: argv.date
    })
    .pipe(through.obj(function(data, _, cb) {
      const m = moment.utc(data.timestamp).format('MM/DD/YYYY @ HH:mm:ss');
      
      // [MM/DD/YYYY @ HH:MM:SS] <nick> saying
      this.push(`[${m}] <${data.user}> ${data.message}\n`);
      cb();
    }))
    .pipe(w);
  });
}

module.exports = pullDay;
