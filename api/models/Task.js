/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {

  tableName: "tasks",
  attributes: {
    name: {
      type: "string",
      required: true
    },

    description: {
      type: "string"
    },

    dueDate: {
      type: "date",
      required: true
    },

    tags: {
      type: "string",
      required: true
    },

    user: {
      model: "user",
      required: true
    }
  },

  validationMessages: { //hand for i18n & l10n
    name: {
      required: 'Name is required'
    },
    dueDate: {
      required: 'due date is required'
    },
    tags: {
      required: 'tags is required'
    },
    user: {
      required: 'user is required'
    }

  }
};