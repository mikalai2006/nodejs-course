const { Transform } = require('stream');

module.exports = class TransformText extends Transform {
  _transform(chunk, encoding, callback) {
    try {
      const resultString = this.encodeDecode(chunk.toString('utf8').trim())
      callback(null, `${resultString}\n`);
    } catch (err) {
      callback(err);
    }
  }

}
