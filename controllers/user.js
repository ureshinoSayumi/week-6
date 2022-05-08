const errorHandle = require('../message/errorHandle')
const sucessHandle = require('../message/sucessHandle')
const User = require('../models/user')

const userController = {
	getAllUser: async function(req, res, next) {
		const newUser = await User.find()
	  sucessHandle(res, newUser, '取得成功')
	},
	createUser: async function(req, res, next) {
		try {
			const createUser = req.body;
			console.log(req.body, 'asd')
			if (!createUser.name || !createUser.email) {
				errorHandle(res, '單筆建立失敗，姓名、email 必填')
				return
			}
			const newUser = await User.create(req.body)
			sucessHandle(res, newUser, '建立成功')
		} catch(err) {
			console.log(err, 'error')
			errorHandle(res, '單筆取得失敗(catch攔截)')
		}
	}
}

module.exports = userController;