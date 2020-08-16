// app.service('$todoService', function($http) {
angularApp = angularApp.service('$repoService', function ($http) {
	const baseUrl = 'http://localhost:3000';
	this.getPaginatedMembers =  function (pageSize, pageNo) {
		const url = baseUrl + '/fork/members?size=' + pageSize + '&page=' + pageNo;
		return $http.get(url);
	}

	this.followForkMember =  function (username) {	
		const url = baseUrl + '/user/following/' + username;
		return $http.put(url);
	}
});