const IdentityProvider = require('./controllers/identity.provider');
const AuthorizationValidation = require('../security/authorization/authorization.validation');
const AuthorizationPermission = require('../security/authorization/authorization.permission');
const config = require('../env.config');


const Surfer = config.permissionLevels.Surfer;

exports.routesConfig = (app) => {
    app.post('/users', [
        IdentityProvider.insert
    ]);
    app.get('/users', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        IdentityProvider.list
    ]);
    app.get('/users/:userId', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        IdentityProvider.getById
    ]);

    app.put('/users/:userId', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.sameUserCantDoThisAction,
        IdentityProvider.putById
    ]);

    app.patch('/users/:userId', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.onlySameUserOrAdminCanDoThisAction,
        IdentityProvider.patchById
    ]);
    app.delete('/users/:userId', [
        AuthorizationValidation.validJWTNeeded,
        AuthorizationPermission.minimumPermissionLevelRequired(Surfer),
        AuthorizationPermission.sameUserCantDoThisAction,
        IdentityProvider.removeById
    ]);
};