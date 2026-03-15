const generator = require("./generator");
const iterator = require("./iterator");

module.exports = {
  ...generator,
  ...iterator
};
