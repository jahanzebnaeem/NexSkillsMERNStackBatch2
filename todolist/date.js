
// console.log(module);
// module.exports = "Hello";
module.exports.getDate = function () {
  const todayDate = new Date();

  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

  return todayDate.toLocaleDateString("en-US", options);
}

module.exports.getDay = function () {
  const todayDate = new Date();

  const options = {
    weekday: 'long'
  };

  return todayDate.toLocaleDateString("en-US", options);
}
