/* global StateService */

require('../../bootstrap');
var _ = require("lodash");

// Here we have our tests
describe('The User Service', function () {

before(function (done) {
    User.create({"email" : "duplicateemail@gmail.com", "password" : "Password@001"}).then(function(data){
        done()
    });
});

it('should return a successful message upon user creation', function (done) {
   UserService
     .create({"email" : "golden@gmail.com", "password" : "123456"})
     .then(function (user) {
         user.should.be.an('array');
         user.should.have.length(2);
         user[1].should.be.an('object');
         user[1].should.have.property('email');
         user[1].email.should.equal("golden@gmail.com");

       done();
     })
     .catch(done);

});

it('should return an error message upon creating a user with an already existing email address', function (done) {
    UserService
      .create({"email" : "duplicateemail@gmail.com", "password" : "123456"})
      .then(function (user) {
          user.should.be.an('array');
          user.should.have.length(1);
          user[0].should.be.an('object');
          user[0].should.have.property('message');
          user[0].message.should.equal("Email Address already exists");
 
        done();
      })
      .catch(done);
 
 });
});