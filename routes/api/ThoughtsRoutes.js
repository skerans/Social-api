const router = require('express').Router();

const {
getThoughts,
getOneThought,
addNewThought,
updateThought,
deleteThought,
addNewReaction,
deleteReaction
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(addNewThought);

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addNewReaction).delete(deleteReaction);


module.exports = router;