/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var promise = require('bluebird');
var _ = require('lodash');
var passport = require('passport');
module.exports = {
    create: function (req, res) {
        let allowedParams = ["email", "password"];
        let data = _.pick(req.body, allowedParams);
        UserService.create(data).spread(function (err, resp) {
            console.log("Error is " + err);
            console.log("response is " + resp);
            if (err)
                return res.badRequest(err);
            return res.ok({ "message": "User successfully created" });
        }).catch(function (err) {
            return res.serverError(err);
        })
    },

    authenticate: function (req, res) {
        //why is passport authentication local...?
        passport.authenticate('local', function (err, user, info) {
            if ((err) || (!user)) {
                return res.badRequest(info);
            }
            var token = JwtService.issue({ id: user.id });
            var expiry = JwtService.getExpiry(token);
            var response = { "access_token": token, "expires_in": expiry, "scope": "jwt", "token_type": "bearer" };
            return res.ok(response);

        })(req, res);
    },

    test: function (req, res) {
        //why is passport authentication local...?
        return res.ok("Successful");
    }

};

