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
    }
};


