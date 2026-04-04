import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post("/login", authController.logIn);
router.post("/logout", authController.logOut);
router.post("/refresh-token", authController.refreshToken);
router.post("/admin-login", authController.adminLogIn);

export default router;
