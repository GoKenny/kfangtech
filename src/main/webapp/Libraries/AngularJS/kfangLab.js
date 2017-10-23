/**
 * Personal Library
 * 
 * Email: kuinai.fang@gmail.com
 * LinkedIn: https://ca.linkedin.com/in/kuinaifang
 * 
 * All Rights Reserved
 * 
 * @author Kenny Fang
 * 
 */



var theApp = angular.module('theApp', []);

theApp.controller('theController', function($scope, $http) {
	
	// ng-model, ng-bind, $scope
	$scope.firstName = "Lebron";
	$scope.lastName = "James";

	setTimeout(function(){
		console.log($scope.firstName);
	}, 1500)
	
	// Filter
	var theData = "Nba";
	$scope.theData = angular.lowercase(theData);	// uppercase, isString, isNumber, currency

	
	
	
	
	// object
	var thePeople = {
			firstName: "Michael",
			lastName: "Jordan",
			age: 10,
			nickName: "THe Air",
	};
	$scope.people =thePeople;
	
	// ng-repeat
	$scope.teammates = [
			         {name: 'Kenny', age: 10},
			         {name: 'James', age: 3},
			         {name: 'Jordan', age: 5},
			         {name: 'Wade', age: 4}
			       ]
		
	// $http AJAX
	$http.get("http://www.w3schools.com/angular/customers.php")
    .success(function(response) {

    	console.log(response);
    	
    	$scope.city = response.records[0].City;
    	
    });
	
	// click
	$scope.doSomething = function(data) {
		
        $scope.count = data;
        
        alert($scope.firstName);
    };
	
    // ng-class
    $scope.changeIt = function(){
    	$scope.theClass = "newClass";
    };
	
    // Fade In / Out 
    $scope.fadeOut = function () {
    	$scope.theFadingClass = "fadeOut";
    };
    
    $scope.fadeIn = function () {
    	$scope.theFadingClass = "fadeIn";
    };
    
});

theApp.filter('myFilter', function($filter){    
    var standardDateFilterFn = $filter('date');
    return function(data){
    	return  "!!!" + data + "!!!";
    }    
});
