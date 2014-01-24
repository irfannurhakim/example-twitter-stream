var twitter = require('ntwitter');
var util = require('util');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var db = new Db('twitter', new Server('localhost', 27017, {safe: false}, {auto_reconnect: true}, {}));
var ctr = 1;

var twit = new twitter({
  consumer_key: 'aTIpG0jGl6nwp4KWhUILBQ',
  consumer_secret: 'cUmQNsQ6u4wn4PUcoQ9PmqzFEzVmzJmGnD2gROeY',
  access_token_key: '44984017-EKeo9ivt957w7Y6uiT2NsCFbM1PQ46KF0c5J41egQ',
  access_token_secret:'DvTKLNq0Nev4XriCRm8cdfRkz7uYtbgddjcl0amOSis'
});




db.open(function(err, db){
  var collection = db.collection('followers');
  var cursor_col = db.collection('cursor');
  var user_id = 307794190; //244818923;

  function getFollower(user_id){
    cursor_col.findOne({id: 2}, function(err, data){
      if(!err){
        var cursor = data.value;
        console.log(cursor);
        twit
          .verifyCredentials(function(err, data) {
          })
          .get('/followers/ids.json', {'cursor' : cursor, 'user_id' : user_id, count: 5000}, function(err, data){
            if(!err){
              for(var i=0;i<data.ids.length;i++){
                collection.insert({'user_id' : user_id, 'follower_id' : data.ids[i]});
              }
              cursor_col.update({id: 2}, {id: 2, value: data.next_cursor});
              console.log(data.ids.length);
            } else {
              console.log(err);
            } 
          });
      } else {
        console.log(err);
      }
    });
  }
  
  //getFollower(user_id);
  setInterval(function(){getFollower(user_id);}, 60500);

});

