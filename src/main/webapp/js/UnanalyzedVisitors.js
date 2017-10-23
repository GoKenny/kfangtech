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

var theApp = angular.module('UnanlyzedVisitors', []);

theApp.controller('theController', function($scope, $http) {

	$scope.loading = true;
	
	$http({
	    method: "get",
	    url: "Traffic",
	    params: { requestType: "getUnanalyzed"}
	})
    .success(function(response) {

    	console.log(response);

    	var unanalyzedBrowsings = response.unanalyzedBrowsings;
    	$scope.unanalyzedBrowsings = unanalyzedBrowsings;
    	
    	var unanalyzedLogins = response.unanalyzedLogins;
    	$scope.unanalyzedLogins = unanalyzedLogins;
    	
    	$scope.loading = false;
    });
	
	$scope.deleteThis = function(id) {
		
		$scope.loading = true;
	    
	    $http({
		    method: "get",
		    url: "Traffic",
		    params: { requestType: "removeOne", id: id}
		})
	    .success(function(response) {

	    	console.log(response);

	    	var unanalyzedBrowsings = response.unanalyzedBrowsings;
	    	$scope.unanalyzedBrowsings = unanalyzedBrowsings;
	    	
	    	var unanalyzedLogins = response.unanalyzedLogins;
	    	$scope.unanalyzedLogins = unanalyzedLogins;
	    	
	    	// Refresh ng-repeat
	    	$scope.$apply();
	    	
	    	$scope.loading = false;
	    });
	    
		 
    };
	
});

