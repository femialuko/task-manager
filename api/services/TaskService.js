/**
 * TaskService
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Services
 */
var promise = require('bluebird');
var _ = require('lodash');
module.exports = {
    create: function (data) {
        var createdTask = User.findOne(data.user).then(function (user) {
            if (!user) {
                return [{ "message": "User specified does not exist" }];
            }
            return [null, user]
        }).spread(function (err, resp) {
            if (err) {
                return [err];
            }
            return [null, Task.create(data)];
        }).spread(function (err, resp) {
            if (err)
                return [err];
            return [null, resp];
        }).catch(function (err) {
            return [err];
        })
        return createdTask;
    },

    tag: function (taskId, tag) {
        var addedTag = Task.findOne({ id: taskId }).then(function (task) {
            if (!task)
                return ["Task not found"];
            return [null, task]
        }).spread(function (err, resp) {
            if (err)
                return [err];
            //filter out duplicate tags
            var presentTags = resp.tags.trim().split(",");
            var tagsToAdd = tag.trim().split(",");
            var commonTags = _.intersection(presentTags, tagsToAdd);
            console.log("Common tags are " + commonTags);
            tagsToAdd = _.difference(tagsToAdd, commonTags).join();
            var finalTag = presentTags.join();
            if (tagsToAdd != '') {
                finalTag = presentTags.join() + "," + tagsToAdd;
            }

            return [null, Task.update({ id: resp.id }, { tags: finalTag })]

        }).spread(function (err, resp) {
            if (err) {
                console.log(err);
                return [err];
            }
            return [null, resp[0]];
        }).catch(function (err) {
            console.log(err);
            return [err];
        });
        return addedTag;
    },

    searchBySubStringOfNameOrQuery: function (query) {
        var tasks = Task.find([{ name: { 'like': '%' + query + '%' }}, { tags: { 'like': '%' + query + '%' }}]).then(function(data){
            return [null, data]
        }).catch(function(error){
            return [error];
        })
        return tasks;
        //  var taskQuery = 'SELECT id, name, tags FROM tasks WHERE name like "%' + query + '%" OR tags LIKE "%' + query + '%"'; 
        // var TaskQueryAsync = promise.promisify(Task.query);
        // var tasks = TaskQueryAsync(taskQuery).then(function(tasks){
        //     return [null, tasks];
        // }).catch(function(err){
        //     return [err];
        // })
        // return tasks;
    },

    addDays: function(date, days) {
        var result = date;
        result.setDate(result.getDate() + Number(days));
        return result;
      },

    searchForTaskInXDaysTime: function (x) {
        var minDate = TaskService.addDays(new Date(), x-1);
        var maxDate = TaskService.addDays(new Date(), x + 1);
        var tasks = Task.find({ dueDate: { '>': minDate, '<': maxDate } })
        .then(function(data){
            return [null, data]
        }).catch(function(error){
            return [error];
        })
        return tasks;
    }
};


