/* eslint-disable no-unused-expressions, global-require, no-console */
require('yargs')
  .command({
    command: 'hash <pain-password>',
    aliases: ['h'],
    desc: 'Hash a pain password using bcrypt',
    builder: (yargs) => {
      yargs
        .option('r', {
          alias: 'salt-rounds',
          default: 10,
          describe: 'Set the salt rounds, defaults to 10',
          type: 'number',
        })
    },
    handler: (argv) => {
      const {
        'pain-password': painPassword,
        'salt-rounds': saltRounds,
      } = argv
      require('bcrypt').hash(painPassword, saltRounds, (err, hash) => {
        if (err) {
          console.error(err)
          process.exit(-1)
        }

        console.log(hash)
        process.exit()
      })
    },
  })
  .command({
    command: 'compare <hash> <pain-password>',
    aliases: ['c'],
    desc: 'To check a password with the given hash using bcrypt',
    handler: (argv) => {
      const {
        hash,
        'pain-password': painPassword,
      } = argv
      require('bcrypt').compare(painPassword, hash, (err, res) => {
        if (err) {
          console.error(err)
          process.exit(-1)
        }

        console.log(res)
        process.exit()
      })
    },
  })
  .demandCommand(1, 'You need to specify one command')
  .help()
  .argv
