import express from 'express';
import * as authController from '../controllers/authController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/login", authController.logIn);
router.post("/logout", authController.logOut);
router.post("/refresh-token", authController.refreshToken);
router.post("/admin-login", authController.adminLogIn);
router.post("/check-token", authMiddleware.protectedRoute, authController.checkToken);

export default router;
