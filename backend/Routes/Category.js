import express from 'express'
import  isAdmin  from '../Middleware/isAdmin.js'
import { createCategory, deleteCategory, getAllCategories, getOneCategory, updateCategory } from '../Controllers/CategoryCn.js'
const categoryRouter=express.Router()
categoryRouter.route('/').get(getAllCategories).post(isAdmin,createCategory)
categoryRouter.route('/:id').get(isAdmin,getOneCategory).delete(isAdmin,deleteCategory).patch(isAdmin,updateCategory)
export default categoryRouter