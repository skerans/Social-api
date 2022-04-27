const { Schema, Types, model } = require('mongoose');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
      var d = new Date(date),
      month = (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = '' + d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [month, day, year].join('-');}
  },
  userName: {
    type: String, 
    required: true, 
    },
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'reactionSchema',
    },
  ],

});

module.exports = thoughtSchema;