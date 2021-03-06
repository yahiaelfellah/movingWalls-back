const config = require('./env.config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CompaignRouter = require('./compaign/routes.config')
const SecurityRouter = require('./security/routes.config');
const IdentityRouter = require('./identity/routes.config');

config.initRefreshSecret();

//voir Helmet.md
const http = require('http'); //http2 + https (tls)
const fs = require('fs');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin','*' );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range,X-Auth');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
SecurityRouter.routesConfig(app);
IdentityRouter.routesConfig(app);
CompaignRouter.routesConfig(app);
const server = http.createServer(app);
server.listen(config.port);
server.on('error',(error) => {
    if (error) {
        console.error(error);
        return process.exit(1)
    } else {
        console.log('express main configured w and listening on port: ' + config.port + '.')
    }
});
