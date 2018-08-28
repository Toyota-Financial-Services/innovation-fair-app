const Episode7     = require('episode-7');
const createServer = require('./server');
const oAuthToken   = require('./oauth-token');
const updateToken  = require('./update-token');
const server = createServer();


const PORT = process.env.PORT || 5000;
/*const pvsUrl = process.env.EINSTEIN_VISION_URL;
const accountId  = process.env.EINSTEIN_VISION_ACCOUNT_ID;
const privateKey = process.env.EINSTEIN_VISION_PRIVATE_KEY;*/

const pvsUrl = 'https://api.einstein.ai/';
const accountId  = 'heran.guan-1042984@toyota.com';

const privateKey ='-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEowIBAAKCAQEAk44DWE0UEQjfkK/hqywiZYIkjw2pTo8ak/HfAtXK/kE/O2sf\n' +
    'VEKXtEAV0PG6LyShJasppXZL6OYSKoQ6SFzJq3LmdwfkKI/XiSWr7ltlMOMay5H1\n' +
    '1n9+lhlXzGVrjRfod4JtJdrpNDaW/ENNB7Phb+zBhLsMyJrISRXkz+09eP09RylE\n' +
    '/pAqdaWs6Rf65Kg/hLsESG6cx9QRpEVmvHQYB+/iyMO3QfnuwDaGEAxYYJ77tpME\n' +
    'yaog7+ZTkGjIdFwtOJXEJrKZOIzq0rmXLIVhFzm/jRBdd03LkgX4apLTvBlNvbMW\n' +
    'bqxSpu8ZyvqQaYpeAc16jw4tbWA7BcCj+JZ5FQIDAQABAoIBAFd0yM7BgK9IDxp2\n' +
    '5M7L7ec0Z+7SLhN+BkbCCWhox1RD3/Kb34nVno0bntKlM7FViJ4HATwtDXkRRJsm\n' +
    'nFTfijiwdaD/cGAKQbnsNiekzClZsjwOWyOzlZfplXx0cHbEQOj0yTSyt55W7M7A\n' +
    'JRv3phrsvRaqtzz/YM7QxznmZ5UZvDZMkZpIPEmhnnPv9k3QjwOlztX3oQxitg9w\n' +
    'J0FtPhFVuGLD7mhtH1oDa/Ur7APis2nxssNJjWyOugX6uig3iXjGqITGXScoUX3m\n' +
    'SN/AYxqFqSEokCL8WNwRz7sdl24AJzrudJoHhn0dyaBcsbEuYeRKLIqJ7ujJ+Z3Q\n' +
    '9pTA8FECgYEA2RYqjU2Yg882oSVqsTZWXtjEcwkBNjeiuxFSPPVO+DImsjdP7aPk\n' +
    'hFWzfD/EskgqkhzUsShzRy7YKsRONXJNbZ60770ffiNW4icaauw0DNc7T6+FmCQo\n' +
    'q4dXCGJNbKG5cvm4rCjuYla3hCct33yDpAOQIwqg9Xfw2Jusdz7ZzSsCgYEArgEd\n' +
    '4L6IGNZfmOv+oDBYETPaZYPR84UfUSEa0e4GhYWscacDovE7Z5MeAbdyox4vCF+v\n' +
    '9G46dR30GMp9pCZzwYYAI5tuqTdJiZC1MW5dEVMMaTrg1W9SmbLu+M4Ar91L+De/\n' +
    'lBsCL6gbEby/u+FLdUAJ00gRasQ2MJDC0cQMMr8CgYEAjkJDYlPeRUpOL234q+bC\n' +
    '1ObSXdwhyijNYC9qp/3NYUJkL1el7kH/p2UN+LdFK9u04gk4rFuop5YgHG6GHeoo\n' +
    'qVRel9hkweFgt1UOr9DYDy4gdQi90ESpzjYjp5/bwvt8LsdM6KzuAs1294hBPHo5\n' +
    'PgsDsqLtdc7Cqv/hFke+rP8CgYB/s0AbLZmyKLoV/7RqGbC4R0bT069kueEm6FXH\n' +
    'lZlhqp3I9xp7HfFL7TNLbTeLsN4xlhALIk5yn14CR7F3o+S2NUKq3yqSs4mblQD1\n' +
    'WxqgWUO1gsl4um9zb1dkb8MfThiv/THzXvL2yLe9B7nrB8gaL7pGPhDSO1fNwp/H\n' +
    '1Mpi/wKBgFX/fqd8Xp44JM7+DLHrrwP7/X4qi7gfXMCjgkKduE3oJmjW0Nv8p45z\n' +
    'OiE6HYlEGE0sUV10Be4rXfPCUCrh7yL0/s3sP+4BbQapE38bYyi9PWVxL/Rn3Vpp\n' +
    'MIb6QL/ftDLhjmuQh1WXWtvw4FGZwY2YykCcqZMRdJ0zuvW7Hw5U\n' +
    '-----END RSA PRIVATE KEY-----';

    Episode7.run(updateToken, pvsUrl, accountId, privateKey)
.then((token) => {
  console.log(privateKey);
  console.log('tto',token);
  server.listen(PORT, function() {
    console.log('Image Identifier is running on port', PORT);
  });
})
.catch(error => {
  console.log(`Failed to start server: ${error.stack}`);
  process.exit(1);
});

