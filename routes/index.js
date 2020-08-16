const FacebookRepoController = require('../controller/facebookRepo.controller');

module.exports = function (app) {
      app.get('/fork/members', async (request, response) => {
            try {
                  const fbController = new FacebookRepoController();
                  const result = await fbController.getPaginatedMembers(request);
                  return response.send(result);
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
                  return response.send(result);
            } catch (error) {
                  return response.status(500).send({
                        success: false,
                        error: error.message,
                        developerMsg: error.stack
                  });
            }
      });
}