const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction')

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
  reactions: [reactionSchema],

},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;