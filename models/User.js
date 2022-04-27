const { Schema, Types } = require('mongoose');

const userSchema = new Schema({
  userName: {
     type: String, 
     unique: true, 
     required: true, 
     trim: true
    },
  email: {
     type: String, 
     unique: true, 
     required: true, 
     match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],

});

module.exports = userSchema;