var moment = require('moment');
// var date = new Date();
// console.log(date.getMonth());
var date = moment(1234);
date.add(1,'year');
console.log(date.format());
console.log(date.format('MMM'));
console.log(date.format('MMM Do, YYYY h:mm a'));
