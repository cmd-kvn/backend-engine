const http = require('http');
const app = require('./lib/app');
require('mongoose');

// const findAndUpdate = require('./lib/update-user');
// const User = require('./lib/models/user.model');


require('./lib/connection');

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log('server is running on ', server.address());
});

// TODO: add function to make a list of users to update; users who recently logged in 
// setInterval(/* 

// 3 layer cb function:
// - 1st layer: wrapper/cb
// - 2nd layer: find users
//		- 3rd layer: update-users.js(new Date(), users) forEach user
//	save users to db

// */ , 86400);


/* test setInterval
// var banana ={age: 1};
// setInterval(addAge, 1000);

function addAge() {
	
	banana.age += 1;
	console.log(banana.age);
	// user.save();
	// return user;
}
*/