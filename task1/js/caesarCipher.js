const { program } = require('commander');
const fs = require('fs');
const alpf = require('./alphavit');

module.exports = class CaesarCipher {
  constructor () {
    this.actions = ['decode', 'encode'];
  }

  hError(err) {
    process.stderr.write(`${err.red}\n`)
    process.exit(1);
  }

  parseShift(value) {
    const val = parseInt(value);
    if (isNaN(val) || !isFinite(val)) {
      throw new Error(`Incorrect value shift [${value}]. Set correct number`)
    }
    return val
  }

  parseAction(action) {
    const str = action.toString().trim();
    return str
  }

  createParams(){
    process.on('exit', function(code) {
      process.stdout.write(`Code completion: ${code} \r\n`.gray)
    })

    program.on('--help', () => {
      process.stdout.write('\n');
      process.stdout.write('WARNING:\n'.yellow.bold)
      process.stdout.write('  Action (encode/decode) and the shift are required\n'.yellow.bold)
      process.stdout.write('Examples:\n'.blue);
      process.stdout.write('  node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"\n'.blue);
      process.stdout.write('  node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt\n'.blue);
    })

    program
    .storeOptionsAsProperties(false)
    .passCommandToAction(false);

    program
    .name('action')
    .requiredOption('-a,--action <action>', 'an action encode/decode', this.parseAction);

    program
    .version('0.0.1')
    .description('Task 1. Caesar cipher CLI tool.')
    .requiredOption('-s, --shift <num>', 'a shift', this.parseShift)
    .option('-i, --input <file>', 'an input file', false)
    .option('-o, --output <file>', 'an output file', false)

    try {
      program.parse(process.argv);
      const params = program.opts();
      process.stdout.write(`Input options : ${JSON.stringify(params)} \r\n`.gray);
      this.params = program.opts();
    } catch (err) {
      process.stdout.write(`${err.toString().red}\r\n`);
      // program.outputHelp();
      process.exit(1);
    }
    return this
  }

  validateParams() {
    if (!this.actions.includes(this.params.action)) {
      this.hError(`Incorrect type action! Valid type: ${this.actions}`)
    }
    if (this.params.shift > alpf.length) {
      this.params.shift = this.params.shift % alpf.length;
      // process.stdout.write(`Change big shift to ${JSON.stringify(this.params.shift)} \r\n`.yellow);
    }
    if (this.params.input) {
      if (!fs.existsSync(this.params.input)) {
        this.hError('Error-> No found input file with path = ' + this.params.input);
      }
    }
    if (this.params.output) {
      if (!fs.existsSync(this.params.output)) {
        this.hError('Error-> No found output file with path = ' + this.params.output);
      }
    }
    return this
  }

  create() {
    this
      .createParams()
      .validateParams();
    return this
  }
}
