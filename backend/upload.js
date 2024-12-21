import express from "express";
import upload from './../Utils/uploadFile.js';
import { deleteFile, uploadCn } from "../Controllers/UploadCn.js";
import isAdmin from "../Middleware/isAdmin.js";
const uploadRouter = express.Router();

uploadRouter
  .route("/")
  .post(isAdmin, upload.single("file"), uploadCn)
  .delete(isAdmin, deleteFile);

export default uploadRouter;
