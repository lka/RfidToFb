'use strict';

const concat = require('concat-stream'),
      Fb = require('node-firebird'),
      fs = require('fs'),
      path = require('path'),
      readline = require('readline'),
      PassThrough = require('stream').PassThrough;

// read initialization of the configuration into options from JSON file
const readStream = fs.createReadStream(path.join(__dirname, 'config', 'configuration.json'));
let options = {};

readStream.once('error', err => {
  console.log(err);
  // exit process with error set without configuration
  process.exit(1);
});

readStream.once('open', () => {
  readStream.pipe(concat(data => {
    options = JSON.parse(data);
  }));
});

// read from stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Input: '
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
    case '':
      break;
    default:
      console.log(`Say what? I might have heard '${line.trim()}'`);

      //options.host = '127.0.0.1';
      //options.port = 3050;
      //options.database = 'database.fdb';
      //options.user = 'SYSDBA';
      //options.password = 'masterkey';
      //options.lowercase_keys = false; // set to true to lowercase keys
      //options.role = null;            // default
      //options.pageSize = 4096;        // default when creating database
      //   options.station: 1,  // station number
      //   options.transaction: 1 // use transaction yes/no
      // };

      // console.log('initialized configuration: ', options);
      Fb.attach(options, (err, db) => {
        if (err) {
          throw err;
        }
        const sql = 'INSERT INTO '+options.table+' (DAT, STATION, SN) VALUES ('+Fb.escape(new Date())+', '+Fb.escape(options.station)+', '+Fb.escape(line.trim())+')';

        if (options.transaction === 1) {
          db.transaction(Fb.ISOLATION_READ_COMMITED, (err, transaction) => {
            transaction.query(sql, (err, result) => {

              if (err) {
                transaction.rollback();
                return;
              }

              transaction.commit((err) => {
                if (err)
                  transaction.rollback();
                else
                  db.detach();
              });
            });
          });
        } else {
          db.query(sql, (err, result) => {
            db.detach();
          });
        };
      });

      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
