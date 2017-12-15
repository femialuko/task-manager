require('../../bootstrap');
var _ = require("lodash");

// Here we have our tests
//look up more on how the tokens are generated to see if the exact value of the token can be gotten and asserted..
describe('The Jwt Service', function () {

    before(function (done) {
        done();
    });

    it('should return a token upon request', function (done) {
        var token = JwtService.issue({ "id": 1, "email": "golden@gmail.com" })
        token.should.be.a('string');
        done();


    });

    it('should return the expiry date upon request', function (done) {
        var token = JwtService.issue({ "id": 1, "email": "golden@gmail.com" })
        var expiry = JwtService.getExpiry(token);
        expiry.should.be.a('number');
        done();
    });

    it('should return the user details upon verification', function (done) {
        var token = JwtService.issue({ "id": 1, "email": "golden@gmail.com" })
        var userDetails = JwtService.verify(token);
        userDetails.should.be.a('object');
        userDetails.should.have.property('email');
        userDetails.should.have.property('id');
        userDetails.should.have.property('exp');
        userDetails.email.should.equal('golden@gmail.com');
        userDetails.id.should.equal(1);
        userDetails.exp.should.be.a('number');
        
        done();
    });

});