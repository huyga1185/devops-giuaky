import express from 'express';
import * as authMiddleware from '../middlewares/authMiddleware.js';
import * as tkController from '../controllers/taiKhoanController.js';

const router = express.Router();

router.post("/", authMiddleware.protectedRoute, authMiddleware.checkAdmin, tkController.createTaiKhoan);

export default router;
