'use strict';
const BaseProxy = require("./base.proxy");
const STATUS = require('../constant/status');

class FacebookRepoProxy extends BaseProxy {

    constructor() {
        super(process.env.GITHUB_URL);
    }

    /**
     * Call github api to call all fork members
     * 
     * @param {Number} perPage 
     * @param {Number} pageNo 
     */
    async getForkMembers(perPage, pageNo) {
        const options = {
            url: `${this.baseUrl}/repos/facebook/react/forks?per_page=` + perPage + `&page=` + pageNo,
            headers: {
                'Cookie': '_octo=GH1.1.1162076144.1597321896; logged_in=no',
                'User-Agent': process.env.GITHUB_USER
            }
        };

        return await this.get(options);
    }

    /**
     * To follow fork member.
     * 
     * @param {string} username 
     */
    async followForkMember(username) {
        const options = {
            url: `${this.baseUrl}/user/following/` + username,
            headers: {
                'Authorization': 'token ' + process.env.GITHUB_API_KEY,
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': process.env.GITHUB_USER,
                'Content-Length': 0
            }
        };
        return await this.put(options);
    }

    /**
     * To check if tageted user already followed.
     * 
     * @param {string} targetUser 
     */
    async isUserFollowed(targetUser) {
        try {
            const options = {
                url: `${this.baseUrl}/users/` + process.env.GITHUB_USER + `/following/` + targetUser,
                headers: {
                    'Authorization': 'token ' + process.env.GITHUB_API_KEY,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': process.env.GITHUB_USER
                }
            };
            const resp = await this.get(options);
            return resp.statusCode == STATUS.NO_CONTENT;
        } catch (error) {
            return false;
        }
    }

}

module.exports = FacebookRepoProxy;