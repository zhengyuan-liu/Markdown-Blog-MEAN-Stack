var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';  // Connection URL
const dbName = 'BlogServer';
const collName = 'Users';
let db = null;

var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var jwt = require('jsonwebtoken');
const secret = 'C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
	assert.equal(null, err);
	console.log("Connected successfully to MongDB server");
	db = client.db(dbName);
});

const getUser = function(db, username, callback) {
	db.collection(collName).findOne({ "username": username })
	.then(callback);
}

router.get('', function(req, res, next) {
	let username = req.query.username;
	let password = req.query.password;
	let redirect = req.query.redirect;
	getUser(db, username, function(user) {
		console.log(user);
		if(user === null)
			res.render('login-fail', { username: username, redirect: redirect });
		else {
			let hash = user.password;
			bcrypt.compare(password, hash, function(err, result) {
				console.log(result);
				if(!result)  // password is wrong or empty
					res.render('login-fail', { username: username, redirect: redirect });
				else {
					let expiration = Math.floor(Date.now() / 1000) + 7200;
					let token = jwt.sign({ exp: expiration, usr: username }, secret);
					console.log(token);
					res.cookie('jwt', token);
					//res.render('login-fail', { username: "successfully", redirect: redirect });
					res.redirect(redirect);
				}
			});
		}
	});
});

module.exports = router;
