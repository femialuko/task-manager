/**
 * ValidationMessageService
 *
 * @description :: Server-side logic for managing Validations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */
var promise = require('bluebird');
var _ = require('lodash');
module.exports = {
    format: function (error) {
        var resp = {};
        console.log("Error is " + error);
        _.forOwn(error, function(value, key) { 
            resp[key] = value[1];
        });
        
        return resp;
    }
};

