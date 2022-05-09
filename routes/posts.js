var express = require('express');
var router = express.Router();
const errorHandle = require('../message/errorHandle')
const sucessHandle = require('../message/sucessHandle')
const Post = require('../models/post')
const postController = require('../controllers/post')

/* GET users listing. */
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPost);
router.post('/', postController.createPost);
router.patch('/:id', postController.updatePost);
router.delete('/', postController.deleteAllPost);

module.exports = router;
