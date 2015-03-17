Lookup bus routes and next arrival predictions. 
===============================================

You can see a live example of this running here: [ttc.ninja](http://ttc.ninja/)

This version is defaulting to the TTC (Toronto Transit Commission) as it's one of only a couple of transit services that implement the predictions API. Well... that and I live in Toronto. 

It could be adapted for many other municipalities. Once running a list of transit agencies can be found here: http://localhost:8080/agencies

Instructions for installation
-----------------------------

```shell
git clone https://github.com/bjdixon/bus-arrival-predictions.git
cd bus-arrival-predictions
npm install
node server.js
```

Serves restbus api eg: http://localhost:3000/agencies/ttc/routes/90/

Serves front end application (angular) eg: http://localhost:8080/

Includes a small suite of integration tests that require protractor.js to run.

