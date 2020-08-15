// app.service('$todoService', function($http) {
angularApp = angularApp.service('$repoService', function ($http) {
	const baseUrl = 'http://localhost:3000';
	this.getPaginatedMembers =  function (pageSize) {
		var url = baseUrl + '/fork/members?size=' + pageSize;
		return $http.get(url);
	}

	this.followForkMember =  function (username) {	
		var url = baseUrl + '/user/following/' + username;
		return $http.put(url);
	}
});