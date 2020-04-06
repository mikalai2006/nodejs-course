const TransformText = require('./trasformText');
const alpf = require('./alphavit');
module.exports = class EncodeDecode extends TransformText {
  constructor(params) {
    super();
    this.shift = params.shift;
    this.action = params.action;
  }

  encodeDecode(text) {
    let newText = '';
    const step = this.shift;
    const action = this.action;
    newText = [...text].map(el => {
      if ([...alpf.toLowerCase()].includes(el.toLowerCase())) {
        const index = [...alpf].findIndex(
          x => x.toLowerCase() === el.toLowerCase()
        );
        let newIndex;
        // console.log(` el = ${el}|| index = ${index} | step = ${step} || len = ${alpf.length}`)
        if (action == 'encode') {
          newIndex =
            index + step < alpf.length
              ? index + step
              : Math.abs(alpf.length - index - step);
        } else {
          newIndex =
            index - step >= 0
              ? index - step
              : Math.abs(alpf.length - Math.abs(index - step));
        }
        // console.log(`new index = ${newIndex}`)
        return el.toUpperCase() === el || el.toUpperCase() === el.toLowerCase()
          ? alpf[newIndex]
          : alpf[newIndex].toLocaleLowerCase();
      }
      return el;
    });
    return newText.join('');
  }
};
