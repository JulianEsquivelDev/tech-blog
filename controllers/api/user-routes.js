const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res ) => {
    User.findAll({
        attributes: { exclude: ['password' ] }
    })
    .then(userDbData => res.json(userDbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(userDbData => {
        if (!userDbData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        twitter: req.body.twitter,
        github: req.body.github
    })
    .then(userDbData => {
        req.session.save(() => {
            req.session.user_id = userDbData.id;
            req.session.username = userDbData.username;
            req.session.twitter = userDbData.twitter;
            req.session.github = userDbData.github;
            req.session.loggedIn = true;

            res.json(userDbData);
        });
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(userDbData => {
        if (!userDbData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        // const for correct password
        const validPassword = userDbData.checkPassword(req.body.password);
        // verify if password is correct
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userDbData.id;
            req.session.username = userDbData.username;
            req.session.twitter = userDbData.twitter;
            req.session.github = userDbData.github;
            req.session.loggedIn = true;


        res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});
// logout router
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      }
      else {
        res.status(404).end();
      }
});

// router to update user by the id
router.put('/:id', withAuth, (req, res ) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(userDbData => {
        if (!userDbData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// router to delete user by id
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userDbData => {
        if (!userDbData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userDbData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;