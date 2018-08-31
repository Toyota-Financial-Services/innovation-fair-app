const express     = require('express');
const multipart   = require('connect-multiparty');
const fileUpload  = require('./file-upload');
const updateToken  = require('./update-token');
const Episode7     = require('episode-7');


function createServer() {
  const app                 = express();
  const multipartMiddleware = multipart();

  app.use(express.static(__dirname + '/../react-ui/build'));
  app.post('/model', multipartMiddleware, function(request, response){
    console.log(request);
    let body = request.body;
    console.log(body);
    const modelId    = body.CUSTOM_MODEL_ID;
      const pvsUrl = process.env.EINSTEIN_VISION_URL;
      const accountId  = process.env.EINSTEIN_VISION_ACCOUNT_ID;
      const privateKey = process.env.EINSTEIN_VISION_PRIVATE_KEY;

      Episode7.run(updateToken, pvsUrl, accountId, privateKey)
      .then((jwtToken) => {
        console.log(jwtToken);
        response.status(200).send(jwtToken);
      })
      .catch(error => {
        console.log(`create token error: ${error.stack}`);
        //process.exit(1);
      });
  });

  app.post('/file-upload', multipartMiddleware, fileUpload);

  app.use(logErrors);
  app.use(clientErrorHandler);
  app.use(errorHandler);

  return app;
}

module.exports = createServer;


function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  var isJSON = req.headers['content-type'] === 'application/json';
  if (isJSON) {
    res.status(500);
    res.send({ error: err.message });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.send(err.message);
}