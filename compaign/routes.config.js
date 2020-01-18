const AuthorizationValidation = require('../security/authorization/authorization.validation');
const AuthorizationPermission = require('../security/authorization/authorization.permission');
const config = require('../env.config');
const compaignProvider = require('./controllers/compaign.provider');

const Surfer = config.permissionLevels.Surfer;

exports.routesConfig = function (app) {
    app.post('/compaign', [
        AuthorizationValidation.validJWTNeeded,
        compaignProvider.insert
    ]);
    app.get('/compaigns', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(config.permissionLevels.Surfer),
        compaignProvider.list
    ]);
    app.get('/compaigns/:id', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.sameUserCantDoThisAction,
        compaignProvider.getById
    ]);

    app.patch('/compaigns/:id', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        compaignProvider.patchById
    ]);
    
    app.delete('/compaigns/:id', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.sameUserCantDoThisAction,
        compaignProvider.removeById
    ]);
}