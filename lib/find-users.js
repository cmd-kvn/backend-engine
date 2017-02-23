// const User = require('.models/user.model');
// const update = require('./update-users');

// module.exports = findUsers();

// function findUsers(date) {
//     User.find(/* layer here to select users who signed in recently? where().is.greater.than.()*/)
//        .then(users => users.forEach(x => update(date, x))
//        .then(users => {
//         users.forEach( x => {
//             markModified(x.job)
//             // markModified(x./*more paths*/)
//         })
//         users.forEach( x => x.save()) // or do a map so in a test the changes can be viewed?
//         })
// }