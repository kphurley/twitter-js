var _ = require('lodash');

var data = [];
var id = 0;
var counter = 0;

function add (name, content, img_url) {
    
    var imgNumber;
    var foundStuff = find({name: name});
    
    if(img_url.length > 0){
        //new image requested
        imgNumber = img_url;
        data.forEach(function(ele) {
           if(ele.name == name)
               ele.image = imgNumber; 
        });
    }
    else if(foundStuff.length === 0){
        //data.push({ id: id, name: name, content: content, image: counter });
        imgNumber = "/images/image" + counter + ".png";
        counter++;
    }
  else{
      imgNumber = foundStuff[0].image;
      
  }
    data.unshift({ id: id, name: name, content: content, image: imgNumber });
    id++;
}

function list () {
  return _.cloneDeep(data);
}

function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
}

module.exports = { add: add, list: list, find: find };


//Test tweet generation ----
/*var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getFakeName = function() {
  var fakeFirsts = ['Nimit', 'Dave', 'Shanna', 'Charlotte', 'Scott', 'Ayana', 'Omri', 'Gabriel', 'Joe'];
  var fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

var getFakeTweet = function() {
  var awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for (var i = 0; i < 10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}*/


//---end of test