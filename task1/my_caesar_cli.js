// $ DEBUG=express.* node task.js
const fs = require('fs');
const { Transform, pipeline } = require('stream');
const colors = require('colors');
const { program } = require('commander');

const alpf = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

class TransformText extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      const resultString = this.encodeDecode(chunk.toString('utf8').trim())
      callback(null, `${resultString}\n`);
    } catch (err) {
      callback(err);
    }
  }

}

class EncodeDecode extends TransformText {
  constructor (params) {
    super();
    this.shift = params.shift;
    this.action = params.action;
  }

  encodeDecode(text) {
    let newText = '';
    const step = this.shift;
    const action = this.action;
    newText = [...text].map((el) => {
      if ([...alpf.toLowerCase()].includes(el.toLowerCase())) {
        const index = [...alpf].findIndex(x => x.toLowerCase() === el.toLowerCase())
        let newIndex;
        // console.log(` el = ${el}|| index = ${index} | step = ${step} || len = ${alpf.length}`)
        if (action == 'encode') {
          newIndex = (index + step < alpf.length) ? index + step : Math.abs(alpf.length - index - step)
        } else {
          newIndex = (index - step >= 0) ? index - step : Math.abs(alpf.length - Math.abs(index - step))
        }
        // console.log(`new index = ${newIndex}`)
        return (el.toUpperCase() === el || el.toUpperCase() === el.toLowerCase()) ? alpf[newIndex] : alpf[newIndex].toLocaleLowerCase()
      } else {
        return el
      }
    })
    return newText.join('');
  }
}

class CaesarCipher {
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

  createStream() {
    let readText;
    let tranformText = new EncodeDecode(this.params);
    let writeText;
    if (this.params.input) {
      try {
        if (fs.existsSync(this.params.input)) {
          readText = fs.createReadStream(this.params.input)
        }
      } catch(err) {
        this.hError('ERROR: ' + this.params.input + err);
        return
      }
    }

    if (this.params.output) {
      try {
        if (fs.existsSync(this.params.output)) {
          writeText = fs.createWriteStream(this.params.output)
        }
      } catch(err) {
        this.hError('ERROR: ' + this.params.output + err);
      }
    }

    const a = pipeline(
      readText || this.inputStd(),
      tranformText,
      writeText || this.outputStd(),
      (err) => {
        if (err) {
          console.error('Pipeline failed', err);
        } else {
          console.log(`Pipeline succeeded. See file ${this.params.output}`.green);
        }
      }
    )
  }

  outputStd() {
    return process.stdout;
  }

  inputStd() {
    process.stdout.write("Input text: \r\n");
    return process.stdin.addListener("data", function(d) {
      return d.toString().trim();
    });
  }

  create() {
    this
    .createParams()
    .validateParams()
    .createStream();
  }
}

const CaesarCipher1 = new CaesarCipher().create()
