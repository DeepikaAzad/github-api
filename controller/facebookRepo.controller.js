'use strict';
const Controller = require('./base.controller');
const FacebookRepoProxy = require('../proxy/facebookRepo.proxy');
const { paginationQuery, paginate } = require("../service/pagination");

class FacebookRepoController extends Controller {

      constructor() { super(); }

      /**
       * @author Deepika Azad
       * Return paginated fork members
       * 
       * @return {*} 
       */
      async getPaginatedMembers(req, res) {
            return new Promise(async (resolve, reject) => {
                  try {
                        const perPage = req.per_page || 10;
                        const fbProxyObj = new FacebookRepoProxy();
                        const result = await fbProxyObj.getForkMembers(perPage);
                        return resolve(result);
                  } catch (error) {
                        return reject(error);
                  }
            });
      }

      /**
       * @author Deepika Azad
       * 
       * Follow fork member
       * @param {*} req 
       * @param {*} res 
       */
      async followUser(username) {
            return new Promise(async (resolve, reject) => {
                  try {
                        const fbProxyObj = new FacebookRepoProxy();
                        const result = await fbProxyObj.followForkMember(username);
                        return resolve(result);
                  } catch (error) {
                        return reject(error);
                  }
            });
      }
}
module.exports = FacebookRepoController;