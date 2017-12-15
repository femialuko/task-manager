/**
 * JwtService
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */

var jwt = require('jsonwebtoken');
var tokenSecret = "babafemisecret";

module.exports = {
    issue : function(payload){
        return jwt.sign(payload, tokenSecret, {
            expiresIn : 180
        })
    },

    verify : function(token){
        return jwt.verify(token, tokenSecret);
    }
}
