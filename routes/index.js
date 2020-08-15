const FacebookRepoController = require('../controller/facebookRepo.controller');

module.exports = function (app) {
      app.get('/fork/members', async (request, response) => {
            try {
                  const fbController = new FacebookRepoController();
                  const result = await fbController.getPaginatedMembers(request);
                  const statusCode = result.status || 200;
                  return response.status(statusCode).send(result);
            } catch (error) {
                  return response.status(500).send({
                        success: false,
                        error: error.message,
                        developerMsg: error.stack
                  });
            }
      });

      app.put('/user/following/:username', async (request, response) => {
            try {
                  const fbController = new FacebookRepoController();
                  const result = await fbController.followUser(request.params.username);
                  const statusCode = result.status || 200;
                  return response.status(statusCode).send(result);
            } catch (error) {
                  return response.status(500).send({
                        success: false,
                        error: error.message,
                        developerMsg: error.stack
                  });
            }
      });
}