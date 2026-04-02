import express from 'express';
import * as svController from '../controllers/sinhVienController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/about", authMiddleware.protectedRoute, svController.getAbout);

export default router;
