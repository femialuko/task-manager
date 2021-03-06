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
        let allowedParams = ["name", "description", "dueDate", "tags"];
        let data = _.pick(req.body, allowedParams);
        data.user = req.id;
        TaskService.create(data).spread(function(error, resp){
            if(error){
                return res.badRequest(error);
            }
            return res.ok(resp);
        }).catch(function(err){
            return res.serverError(err);
        })
        
    },

    tag: function (req, res) {
        let allowedParams = ["taskId", "tags"];
        let data = _.pick(req.body, allowedParams);
        TaskService.tag(data.taskId, data.tags).spread(function(error, resp){
            console.log(error);
            if(error){
                return res.badRequest(error);
            }
            console.log(resp);
            return res.ok(resp);
        }).catch(function(err){
            return res.serverError(err);
        })
        
    },

    search: function(req, res){
        let query = req.query.query;
        let days = req.query.days;
        if(query){
        TaskService.searchBySubStringOfNameOrQuery(query).spread(function(error, resp){
            if(error)
                return res.badRequest(error);
            return res.ok(resp);
        }).catch(function(error){
            return res.serverError(error);
        })
    }
    if(days){
        TaskService.searchForTaskInXDaysTime(days).spread(function(error, resp){
            if(error)
                return res.badRequest(error);
            return res.ok(resp);
        }).catch(function(error){
            return res.serverError(error);
        })
    }
    
    },    
};

