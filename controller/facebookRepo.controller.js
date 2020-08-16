'use strict';

const Controller = require('./base.controller');
const STATUS = require('../constant/status');
const FacebookRepoProxy = require('../proxy/facebookRepo.proxy');

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
                        const perPage = req.query.size || 30;
                        const pageNo = req.query.page || 1;
                        let totalPage = 100;
                        const fbProxyObj = new FacebookRepoProxy();
                        const result = await fbProxyObj.getForkMembers(perPage, pageNo);
                        const members = JSON.parse(result.body) || result.body;
                        if(result.headers['link'] !== undefined) {
                              totalPage = this.getLastPage(result.headers['link']);
                        }
                        return resolve({
                              'total_page': totalPage,
                              'data': members
                        });
                  } catch (error) {
                        return reject(error);
                  }
            });
      }

      /**
       * @author Deepika Azad
       * 
       * Below method get total page details for github api
       * from link reponse header.
       * 
       * @param {*} linkHeader 
       */
      getLastPage(linkHeader) {
            const lastUrl = linkHeader.split(',')[1];
            const isLastLink = lastUrl.includes('rel="last"');
            let pageCount = 100;
            if (isLastLink) {
                  const temp = lastUrl.match(/\bhttps?:\/\/\S+/gi)[0].split('?');
                  const url = (lastUrl.match(/\bhttps?:\/\/\S+/gi)[0].split('?')[1]) !== undefined ? temp[1] : null;
                  pageCount = new URLSearchParams(url).get('page').replace(/[^0-9]/g, "");;
            }
            return pageCount;
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
                        const isUserFollowed = await fbProxyObj.isUserFollowed(username);
                        if (isUserFollowed != true) {
                              const result = await fbProxyObj.followForkMember(username);
                              if (result.statusCode == STATUS.NO_CONTENT) {
                                    return resolve({
                                          'success': true,
                                          'already_followed': isUserFollowed
                                    });
                              }
                        } else {
                              return resolve({
                                    'success': true,
                                    'already_followed': isUserFollowed
                              });
                        }
                  } catch (error) {
                        return reject(error);
                  }
            });
      }
}
module.exports = FacebookRepoController;