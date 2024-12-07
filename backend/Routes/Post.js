import express from 'express'
import { createPost, deletePost, getAllPosts, getOnePost, updatePost } from '../Controllers/PostCn.js'
import { isAdmin } from '../Middleware/isAdmin.js'
const postRouter=express.Router()
postRouter.route('/').get(getAllPosts).post(isAdmin,createPost)
postRouter.route('/:id').get(getOnePost).delete(isAdmin,deletePost).patch(isAdmin,updatePost)
export default postRouter