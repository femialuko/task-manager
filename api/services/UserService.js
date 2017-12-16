/**
 * UserService
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */
var promise = require('bluebird');
var _ = require('lodash');
module.exports = {
    create: function (data) {
        var createdUser = User.findOne({ email: data.email }).then(function (resp) {
            if (resp) {
                return [{ "message": "Email Address already exists" }];
            }
            return [null, User.create(data)];
        }).spread(function (err, response) {
            if (err) {
                return [err];
            }
            return [null, response];
        }).catch(function (err) {
            if(err.Errors)
                return [ValidationMessageService.format(err.Errors)];
            return [err];
        })
        return createdUser;
    }
};

