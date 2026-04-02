import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post("/api/auth/login", authController.logIn);
router.post("/api/auth/logout", authController.logOut);

export defaults router;

