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
	var collection = db.collection('tweet_sample');

	twit.stream('statuses/filter', {'track': 'iphone5s,iphone5s,iBox,infobdg,pepatah,cumannanya,tweetramalan,nasehatsuper,kata2bijak,pepatahku,faktanyaadalah,pemulihanjiwa,nasihatsahabat,raisa6690,nicsap,pevpearce,sherinamunaf,vjdaniel'}, function(stream){
	//twit.stream('statuses/filter', {'track': 'iphone5s,iphone5s,iBox'}, function(stream){

  	stream.on('data', function(data){
			console.log(ctr++, new Date());
			collection.insert(data);
			//console.log(data.text);
		});

    stream.on('error', function(err){
      console.log("=========== error ====> ; " + err);
    });

    stream.on('end', function(){
      console.log("---- connection end ----");
    });


	});
});

