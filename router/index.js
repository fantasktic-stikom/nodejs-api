const router = require('express').Router()
const PostController = require('../controllers/post.controller.js')

router.get('/posts', PostController.index)
router.get('/posts/:postId', PostController.show)

module.exports = router