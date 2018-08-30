const path     = require('path');
const sendImageToVisionApi = require('./send-image-to-vision-api');
const updateToken  = require('./update-token');

// Mutable variable to support rewire in tests.
var Episode7 = require('episode-7');

function fileUpload (request, response, next) {
  console.log(request);
  let body = request.body;
  const filePath = request.files.file.path;
  const fileExt  = path.extname(filePath).replace(/^\./,'');
  /*const modelId    = process.env.CUSTOM_MODEL_ID;
  const pvsUrl     = process.env.EINSTEIN_VISION_URL;
  const accountId  = process.env.EINSTEIN_VISION_ACCOUNT_ID;
  const privateKey = process.env.EINSTEIN_VISION_PRIVATE_KEY;
  const jwtToken   = process.env.EINSTEIN_VISION_TOKEN;*/

    const modelId    = body.CUSTOM_MODEL_ID;
    const pvsUrl     = process.env.EINSTEIN_VISION_URL;
    const accountId  = process.env.EINSTEIN_VISION_ACCOUNT_ID;
    const privateKey = process.env.EINSTEIN_VISION_PRIVATE_KEY;
    const jwtToken   = body.token;//yield updateToken(pvsUrl, accountId, privateKey);

    console.log('modelId:', modelId);
    console.log('accountId', accountId);
    console.log('privateKey', privateKey);
    console.log('jwtToken', jwtToken);

  return Episode7.run(sendImageToVisionApi,
               pvsUrl,
               filePath,
               fileExt,
               modelId,
               accountId,
               privateKey,
               jwtToken)
    .then(function(predictions) {
        //response.setHeader('Content-Type', 'application/json'); 
        response.status(200).send(predictions); 
    })
    .catch( error => next(error));
}

module.exports = fileUpload;