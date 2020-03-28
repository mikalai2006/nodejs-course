const EncodeDecode = require('./encodeDecode');
const fs = require('fs');
const { pipeline } = require('stream');

module.exports = class MyStream {
  constructor (data) {
    this.params = data.params
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
  outputStd () {
    return process.stdout;
  }

  inputStd () {
    process.stdout.write("Input text: \r\n");
    return process.stdin.addListener("data", function(d) {
      return d.toString().trim();
    });
  }

  init () {

  }
}
