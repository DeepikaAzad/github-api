'use strict';

const BaseProxy = require("./base.proxy");
const HEADER = require("../constant/header");

class FacebookRepoProxy extends BaseProxy {

    constructor() {
        super(process.env.GITHUB_URL);
    }

    async getForkMembers(perPage) {
        const options = {
            url: `${this.baseUrl}/repos/facebook/react/forks?page_size=` + perPage,
            headers: {
                'Cookie': '_octo=GH1.1.1162076144.1597321896; logged_in=no',
                'User-Agent': 'DeepikaAzad'
            }
        };

        return await this.get(options);
    }

    async followForkMember(username) {
        const options = {
            url: `${this.baseUrl}/user/following/` + username,
            headers: {
                'Authorization': 'token cea26b6020f5cffea3517acbd36fe3a5df168412',
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'DeepikaAzad',
                'Content-Length': 0
            }
        };
        return await this.put(options);
    }

    async getFollowingUsers() {
        const options = {
            url: `${this.baseUrl}/user/following/`,
            headers: {
                'Authorization': 'token cea26b6020f5cffea3517acbd36fe3a5df168412',
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'DeepikaAzad'
            }
        };
        return await this.get(options);
    }

    async isUserFollowed(targetUser) {
        const options = {
            url: `${this.baseUrl}/users/DeepikaAzad/following/` + targetUser,
            headers: {
                'Authorization': 'token cea26b6020f5cffea3517acbd36fe3a5df168412',
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'DeepikaAzad'
            }
        };
        const resp =  await this.get(options);
        return resp.statusCode == STATUS.NO_CONTENT
    }

}

module.exports = FacebookRepoProxy;