/* global TaskService */

require('../../bootstrap');
var _ = require("lodash");

describe('The Task Service', function () {

before(function (done) {
    User.create({"email" : "taskuser@gmail.com", "password" : "Password@001", "id" : 1}).
    then(function(data){
        return [ TaskService.create({"id" : 1, "name" : "Create an api", "description" : "Make it work", "user" : 1, 
        "dueDate" : "2017-12-12", "tags" : "Work,fine"}) ]
     }).
        spread(function(data){
            done();
        })
    });

it('should return the task upon task creation', function (done) {
   TaskService.create({"name" : "Create an api", "description" : "Make it work", "user" : "1", "dueDate" : "2017-12-12", "tags" : "Work,fine"})
     .then(function (task) {
         task.should.be.an('array');
         task.should.have.length(2);
         task[1].should.be.an('object');
         task[1].should.have.property('name');
         task[1].should.have.property('description');
         task[1].should.have.property('user');
         task[1].should.have.property('dueDate');
         task[1].should.have.property('tags');
         task[1].name.should.equal("Create an api");
         task[1].description.should.equal("Make it work");
         task[1].user.should.equal(1);
         task[1].tags.should.equal("Work,fine");
         
       done();
     })
     .catch(done);

});

it('should return an error message upon creating a task with an invalid user id', function (done) {
    TaskService
    .create({"name" : "Create an api", "description" : "Make it work", "user" : 4, "dueDate" : "2017-12-12", "tags" : "Work,fine"})
    .then(function (task) {
          task.should.be.an('array');
          task.should.have.length(1);
          task[0].should.be.an('object');
          task[0].should.have.property('message');
          task[0].message.should.equal("User specified does not exist");
 
        done();
      })
      .catch(done);
 
 });


it('should return the updated task with the new tags when a tag is added.', function (done) {
    TaskService
    .tag(1, "Yh")
    .then(function (task) {
          task.should.be.an('array');
          task.should.have.length(2);
          task[1].should.be.an('object');
          task[1].should.have.property('tags');
          task[1].tags.should.equal("Work,fine,Yh");
 
        done();
      })
      .catch(done);
 
 });


it('should return the updated task with distinct tags when already existing tags are added.', function (done) {
    TaskService
    .tag(1, "Yh,Work,No")
    .then(function (task) {
          task.should.be.an('array');
          task.should.have.length(2);
          task[1].should.be.an('object');
          task[1].should.have.property('tags');
          task[1].tags.should.equal("Work,fine,Yh,No");
 
        done();
      })
      .catch(done);
 
 });

});