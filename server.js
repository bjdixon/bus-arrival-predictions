// start the restbus server 
// (serves the nextbus xml api as json)
var restbus = require('restbus');

restbus.listen('3000', function() {
    console.log('restbus is listening on port 3000');
});

