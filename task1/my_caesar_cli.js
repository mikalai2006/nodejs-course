const colors = require('colors');
const CaesarCipher = require('./js/caesarCipher');
const MyStream = require('./js/stream');

const CCipher = new CaesarCipher().create();
const CStream = new MyStream(CCipher).createStream();
