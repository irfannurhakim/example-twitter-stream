var twitter = require('ntwitter');
var util = require('util');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var db = new Db('twitter', new Server('localhost', 27017, {safe: false}, {auto_reconnect: true}, {}));
var ctr = 1;

var twit = new twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret:''
});

db.open(function(err, db){
	var collection = db.collection('tweet_sample');

	twit.stream('statuses/filter', {'track': ''}, function(stream){

  	stream.on('data', function(data){
			console.log(ctr++, new Date());
			collection.insert(data);
		});

    stream.on('error', function(err){
      console.log("=========== error ====> ; " + err);
    });

    stream.on('end', function(){
      console.log("---- connection end ----");
    });
  });
});
