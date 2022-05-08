const errorHandle = require('../message/errorHandle')
const sucessHandle = require('../message/sucessHandle')
const Post = require('../models/post')

const postController = {
	getAllPost: async function(req, res, next) {
		console.log(req.query, 'asdsad')
		const dateSort = req.query.dateSort
    const filter =  {"content": new RegExp(req.query.content)}
		const newPost = await Post.find(filter).populate({
			path: 'user',
			select: 'name photo email'
		}).sort(dateSort)
		sucessHandle(res, newPost, '取得成功')
	},
	createPost: async function(req, res, next) {
		try {
			const createData = req.body;
			if (!createData.content) {
				errorHandle(res, '單筆建立失敗，貼文內容必填')
				return
			}
			const newPost = await Post.create(createData)
			sucessHandle(res, newPost, '建立成功')
		} catch(err) {
			console.log(err, 'error')
			errorHandle(res, '單筆建立失敗(catch攔截)')
		}
	}
}

module.exports = postController;