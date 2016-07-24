var DateFormatter = function(dateToFormat) {
  var hours = dateToFormat.getHours();
  var minutes = dateToFormat.getMinutes();
  var seconds = dateToFormat.getSeconds();

  if (hours < 9) {
    hours = '0' + hours;
  }
  if (minutes < 9) {
    minutes = '0' + minutes;
  }
  if (seconds < 9) {
    seconds = '0' + seconds;
  }

  return  hours + ':' + minutes + ':' + seconds;
};

module.exports = DateFormatter;
