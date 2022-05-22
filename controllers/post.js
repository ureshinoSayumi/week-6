const sucessHandle = require('../service/sucessHandle')
const handleErrorAsync = require('../service/handleErrorAsync')
const Post = require('../models/postModel')
const User = require('../models/userModel')
const appError = require('../service/appError')

const postController = {
	getAllPosts: async function(req, res, next) {
		console.log(req.query, 'req.query')
		const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
		const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {}
		const newPost = await Post.find(q).populate({
			path: 'user',
			select: 'name photo '
		}).sort(timeSort)
		sucessHandle(res, newPost, '取得成功')
	},
	
	getPost: handleErrorAsync(async (req, res, next) => {
		const id = req.params.id
		const newPost = await Post.findById(id).populate({
			path: 'user',
			select: 'name photo'
		})
		if (newPost === null) {
			return appError(400, '無此資料', next)
		}
		sucessHandle(res, newPost, '取得成功')    
  }),
	
	createPost: handleErrorAsync(async function(req, res, next) {
		const createData = req.body
		console.log(createData, 'createData')
		console.log(req.user.id, 'req.user.id')
		if (!createData.content) {
			console.log(createData.content, 'createData.content')
			return appError(400, '單筆建立失敗，貼文內容必填', next)
		}
		// if (!createData.user) {
		// 	return appError(400, '單筆建立失敗，使用者ID必填', next)
		// }
		const checkUser = await User.findById(req.user.id).catch((err) => null)
		if (checkUser === null) {
			return appError(400, '單筆建立失敗，無此使用者ID', next)
		}
		createData.user = req.user.id
		const newPost = await Post.create(createData)
		sucessHandle(res, newPost, '建立成功')
	}),

	updatePost: handleErrorAsync(async (req, res, next) => {
		const id = req.params.id
		const updateData = req.body
		if (!updateData.content) {
			return appError(400, '單筆編輯失敗，貼文內容必填', next)
		}
		if (!updateData.user) {
			return appError(400, '單筆編輯失敗，使用者ID必填', next)
		}
		const checkUser = await User.findById(updateData.user).catch((err) => null)
		if (checkUser === null) {
			return appError(400, '單筆編輯失敗，無此使用者ID', next)
		}
		
		const newPost = await Post.findByIdAndUpdate(id, updateData, { returnDocument: 'after' })
		sucessHandle(res, newPost, '編輯成功')
  }),

	deleteAllPost: async (req, res) => {
		const newPost  = await Post.deleteMany({})
		sucessHandle(res, newPost, '成功刪除全部貼文')
  },
}

module.exports = postController;