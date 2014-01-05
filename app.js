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
	var collection = db.collection('raw_data');

	twit.stream('statuses/filter', {'track': 'happy new year, 2014, newyear'}, function(stream){
		stream.on('data', function(data){
			//console.log(ctr++, new Date());
			collection.insert(data);
			//console.log(data.text);
		});	
	});
});

