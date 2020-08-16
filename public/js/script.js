let angularApp = angular.module('homeApp', ['ngRoute', 'angularUtils.directives.dirPagination', 'toastr']);

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


function MyController($scope, $repoService, toastr) {
	$scope.currentPage = 1;
	$scope.pageSize = 10;
	$scope.members = [];
	$scope.totalMembers = 10;
	
	const num = 1;
	$scope.initPage = function () {
		$scope.getForkMember(num);
	}

	$scope.pageChangeHandler = function (num) {
		$scope.getForkMember(num);
		console.log('members page changed to ' + num);
	};

	$scope.getForkMember = function (num) {
		$repoService.getPaginatedMembers($scope.totalMembers, num).then(function successCallback(response) {
			$scope.paginatedData = response.data;
			$scope.totalMembers = $scope.paginatedData.total_page || 100;
			$scope.members = $scope.paginatedData.data;
		}, function errorCallback(error) {
			// @TODO: Handle the error properly instead of alert.
			toastr.error('Internal server error, Please contact support team.');
			console.log(error);
		});
	}

	$scope.followForkMember = function (username,index) {

		$repoService.followForkMember(username).then(function successCallback(response) {
			if (response.data.success) {
				$scope.members[index].disabled = true;
				if(response.data.already_followed) {
					toastr.info('User followed already...');
				} else {
					toastr.success('User followed successfully...');
				}
			}
		}, function errorCallback(error) {
			// @TODO: Handle the error properly instead of alert.
			toastr.warning('Internal server error!');
		});
	}
}

angularApp.controller('MyController', MyController);