const errorHandle = require('../message/errorHandle')
const sucessHandle = require('../message/sucessHandle')
const Post = require('../models/post')

const postController = {
	getAllPosts: async function(req, res, next) {
		console.log(req.query, 'asdsad')
		const dateSort = req.query.dateSort
    const filter =  {"content": new RegExp(req.query.content)}
		const newPost = await Post.find(filter).populate({
			path: 'user',
			select: 'name photo email'
		}).sort(dateSort)
		sucessHandle(res, newPost, '取得成功')
	},
	getPost: async (req, res, next) => {
		try {
			const id = req.params.id
			if (!id) {
				errorHandle(res, '單筆取得失敗，無此資料')
				return
			}
			const newPost = await Post.findById(id).populate({
				path: 'user',
				select: 'name photo'
			})
			if (newPost === null) {
				errorHandle(res, '單筆取得失敗，無此資料')
				return
			}
			console.log(newPost)
			sucessHandle(res, newPost, '取得成功')
		} catch(error) {
			errorHandle(res, '單筆取得失敗，無此資料(catch攔截)')
		}
    
  },
	createPost: async function(req, res, next) {
		try {
			const createData = req.body
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
	},
	updatePost: async (req, res) => {
    try {
      const id = req.params.id
      const updateData = req.body
			if (!updateData.content) {
				errorHandle(res, '單筆更新失敗，貼文內容必填')
				return
			}
			await Post.findByIdAndUpdate(id, updateData)
			const newPost = await Post.find().populate({
				path: 'user',
				select: 'name photo'
			})
			sucessHandle(res, newPost, '建立成功')
    } catch (err) {
      errorHandle(res, '單筆建立失敗(catch攔截)')
    }
  },
	deleteAllPost: async (req, res) => {
    const newPost  = await Post.deleteMany({})
    sucessHandle(res, newPost, '成功刪除全部貼文')
  },
}

module.exports = postController;