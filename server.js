const http = require('http');
const app = require('./lib/app');

// const findAndUpdate = require('./lib/find-users');


require('./lib/connection');

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log('server is running on ', server.address());
});

// TODO: add function to make a list of users to update; users who recently logged in 
// setInterval(/* () => 

//- some function to save the updated users to the db
//- import the user model and run the methods to find all users (or some) then let the update function run on the users
//- update function here*/

// findAndUpdate(new Date())
// , 86400);

