const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req,res) => {
    Comment.findAll({})
    .then(commentDbData => res.json(commentDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    // execute request session
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
        .then(commentDbData => res.json(commentDbData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});
// use the destroy method to delete a comment by id
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(commentDbData => {
        if (!commentDbData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(commentDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;