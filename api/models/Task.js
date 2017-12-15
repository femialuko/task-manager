/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {

  tableName : "tasks",
  attributes: {
    id : {
      type : "integer",
      primaryKey : true,
      autoIncrement : true
    },
    name : {
      type : "string",
      required : true
    },

    description : {
      type : "string"
    },

    dueDate : {
      type : "date",
      required : true
    },

    tags : {
      type : "string",
      required : true
    },

    user : {
      model : "user",
      required : true
    }
  }
};