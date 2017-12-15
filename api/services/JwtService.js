/**
 * JwtService
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

var jwt = require('jsonwebtoken');
var promise = require('bluebird');
var tokenSecret = "babafemisecret";

module.exports = {
    issue : function(payload){
        return jwt.sign(payload, tokenSecret, {
            expiresIn : 180
        })
    },

    verify: function (token, cb) {
        return jwt.verify(token, tokenSecret, {}, cb);
    },
    getExpiry: function (token) {
        return jwt.verify(token, tokenSecret).exp;
    }
}
