'use strict'
const request = require('request');

const HTTP_PROXY_ERROR = 'Internal Server Error. Please check log for more details.';
const RESOURCE_NOT_FOUND = 'Resource not found or invalid arguments supplied. Please check log for more details.';

class BaseProxy {

	constructor(baseUrl) {
		this.baseUrl = baseUrl;
	}

	async get(options) {
		options.method = 'GET';
		return await this._exec(options);
	}

	async put(options) {
		options.method = 'PUT';
		return await this._exec(options);
	}

	async _exec(options) {
		return new Promise((resolve, reject) => {
			request(options, function (error, response) {
				if (error) return reject(error);
				if (response.statusCode >= 200 && response.statusCode < 300) {
					try {
						resolve(JSON.parse(response.body));
					} catch (error) {
						resolve(response);
					}
				} else if (response.statusCode >= 400 && response.statusCode < 500) {
					// TODO: Parse response body if its json and return the actual error
					let msg = BaseProxy.getMessage(response.body, RESOURCE_NOT_FOUND);
					reject({
						message: msg,
						status: response.statusCode
					});
				} else {
					let msg = BaseProxy.getMessage(response.body, HTTP_PROXY_ERROR);
					reject({
						message: msg,
						status: response.statusCode
					});
				}
			});
		});
	}

	static getMessage(val, defaultVal) {
		try {
			val = JSON.parse(val);
			// Don't change the order of below variables
			return val.message || val.error_description || val.error || val.errorMessage || defaultVal;
		} catch (error) {
			return val;
		}
	}
}

module.exports = BaseProxy;