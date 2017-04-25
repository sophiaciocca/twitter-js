//load in lodash
const _ = require('lodash');

//this array will hold ALL of the data
var data = [];

//'add': to add to the data, it will push to the data array
function add(name, content, id){
  data.push({name: name, content: content, id: id});
}

//'list' returns a clone of the data
function list(){
  return _.cloneDeep(data);
}

//'find' searches the data with specific properties
function find(properties){
  return _.cloneDeep(_.filter(data, properties));
}

//exporting our add/list/find functions so that our routes/index.js can use them
module.exports = {
  add: add,
  list: list,
  find: find
};

//all of these just generate the fake twitter users
const randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function() {
  const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
  const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

const getFakeTweet = function() {
  const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for (let i = 0; i < 10; i++) {
  module.exports.add( getFakeName(), getFakeTweet(), i);
}
