const { Thought, User } = require('../models');

module.exports = {

  //Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //get a thought by id
  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId})
      .then((thought) => 
      !thought
      ? res.status(404).json({ message: 'No thought with that ID'})
      : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //add a new thougth to a user
  addNewThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { runValidators: true, new: true }
      );
    })
    .then((thought) => res.json(thought))
    .catch((err) => (res.status(500).json(err)))
  },

  //update a thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
     .then((thought) => 
     !thought
     ? res.status(404).json({ message: 'No thought with that ID'})
     : res.json(thought)
     ) 
     .catch((err) => res.status(500).json(err))
  },

  //delete a thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId})
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with that ID'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  //add a new reaction to a thought
  addNewReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    .then((thought) =>
    !thought
    ? res.status(404).json({ message: 'No thought with that ID' })
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },

  //remove a reaction by id
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.body.reactionId} } },
      { runValidators: true, new: true }
    )
    .then((thought) => 
    !thought
    ? res.status(404).json({ message: 'No thought with that ID'})
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  }
};