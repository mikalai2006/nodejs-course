const localeDB = {
  er404: 'User not found',
  er400: 'Bad request',
  deluser204: 'The user has been deleted',
  ber404: 'Board not found'
};

const $text = key => {
  return localeDB[key] || key;
};

module.exports = {
  localeDB,
  $text
};
