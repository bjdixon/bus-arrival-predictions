(function () {
    'use strict';
    // setup
    var express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        restbus = require('restbus');

    // configuration
    app.use(express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({'extended': 'true'}));
    app.use(bodyParser.json());
    app.use(bodyParser.json({ type: 'application/json'}));

    // App listens on port 8080, restbus listens on port 3000
    app.listen(process.env.PORT || 8080, function () {
        console.log('app listening on port 8080');
        restbus.listen(3000, function () {
            console.log('restbus is listening on port 3000');
        });
    });

    app.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });
}());
