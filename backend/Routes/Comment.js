import express from 'express'
import  isAdmin  from '../Middleware/isAdmin.js'
import { changeActiveComment, createComment, deleteComment, getAllComments, getCommentsPost, getOneComment } from '../Controllers/CommentCn.js'
import isLogin from '../Middleware/isLogin.js'
const commentRouter=express.Router()
commentRouter.route('/').get(isAdmin,getAllComments).post(isLogin,createComment)
commentRouter.route('/post-comments').get(getCommentsPost)
commentRouter.route('/:id').get(isAdmin,getOneComment).delete(isAdmin,deleteComment).patch(isAdmin,changeActiveComment)
export default commentRouter