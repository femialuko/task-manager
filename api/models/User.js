/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt')
module.exports = {

  tableName : "users",
  attributes: {
    email : {
      type : "string",
      required : true
    },

    password : {
      type : "string",
      required : true
    },
  },
  toJSON: function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
  },
  beforeCreate : function(values, cb) {
      bcrypt.hash(values.password, 10, function(err, hash){
        if(err)
          return cb(err);
        values.password = hash;
        cb();
      })
  }
};