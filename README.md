so far...
---------

Shell of the application (server and angular libraries) has been added.

serves restbus api eg: http://localhost:3000/agencies/ttc/routes/90/
serves front end application (angular) eg: http://localhost:8080/

next...
-------

set up routing eg.
$http.get('/agencies/') .success(function(data) { $scope.agencies = data; console.log(data); });

