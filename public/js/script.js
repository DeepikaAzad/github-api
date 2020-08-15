// Code goes here

var angularApp = angular.module('homeApp', ['ngRoute', 'angularUtils.directives.dirPagination']);

angularApp.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'index.html',
			controller: 'MyController'
		})
		.otherwise({
			redirectTo: '/'
		})
});

function MyController($scope, $repoService) {

	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.members = [];
	$scope.initPage = function () {
		$scope.getForkMember();
	}
	
	$scope.pageChangeHandler = function (num) {
		console.log('members page changed to ' + num);
	};

	$scope.getForkMember = function () {

		$repoService.getPaginatedMembers($scope.pageSize).then(function successCallback(response) {
			$scope.paginatedData = response.data;
			console.log($scope.paginatedData);

			const rows = $scope.paginatedData.rows;
			$scope.members = rows;
		}, function errorCallback(error) {
			// @TODO: Handle the error properly instead of alert.
			console.log(error);
		});
	}

	$scope.followForkMember = function (username) {

		$repoService.followForkMember(username).then(function successCallback(response) {	
			console.log(response);
		}, function errorCallback(error) {
			// @TODO: Handle the error properly instead of alert.
			console.log(error);
		});
	}
}

function OtherController($scope) {
	$scope.pageChangeHandler = function (num) {
		console.log('going to page ' + num);
	};
}

angularApp.controller('MyController', MyController);
angularApp.controller('OtherController', OtherController);