import * as tkRepo from '../repositories/taiKhoanRepository.js';
import * as phienRepo from '../repositories/phienReposioty.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const ACCESS_TOKEN_TTL = "15m";

const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

const saltRounds = 10;

export const logIn = async(taiKhoan) => {
  const { mssv, password } = taiKhoan;
  
  const tk = await tkRepo.getTKByMSSV(mssv);

  if (!tk) {
    throw new Error("TK not found!");
  }

  const isPwdCorrect = await bcrypt.compare(password, tk.hashed_password);

  if (isPwdCorrect) {
    const accessToken = jwt.sign({tkId:tk.id, role:tk.role}, process.env.JWT_SECRET_KEY, {expiresIn: ACCESS_TOKEN_TTL});
    const refreshToken = crypto.randomBytes(64).toString('hex');
    
    await phienRepo.create({phienKey:refreshToken, tkId:tk.id});

    return { accessToken, REFRESH_TOKEN_TTL, refreshToken};
  } else {
    throw new Error("Mssv or password is not correct!");
  }
};


export const adminLogIn = async(taiKhoan) => {
  const { username, password } = taiKhoan;
  
  const tk = await tkRepo.getTKByUsername(username);

  if (!tk) {
    throw new Error("TK not found!");
  }

  const isPwdCorrect = await bcrypt.compare(password, tk.hashed_password);

  if (isPwdCorrect) {
    const accessToken = jwt.sign({tkId:tk.id, role:tk.role}, process.env.JWT_SECRET_KEY, {expiresIn: ACCESS_TOKEN_TTL});
    const refreshToken = crypto.randomBytes(64).toString('hex');
    
    await phienRepo.create({phienKey:refreshToken, tkId:tk.id});

    return { accessToken, REFRESH_TOKEN_TTL, refreshToken};
  } else {
    throw new Error("Username or password is not correct!");
  }
};

export const refreshToken = async (token) => {
  const session = phienRepo.getPhienByToken(token);

  if (!session) {
    throw new Error("Token is not valid");
  }

  if (new Date(session.expires_at) < new Date()) {
    throw new Error("Token expired");
  }

  const tk = await tkRepo.getTKById(session.tk_id);

  if (!tk) {
    throw new Error("TK is not existed");
  }

  const accessToken = jwt.sign({ userId: tk.id, role: tk.role }, process.env.JWT_SECRET_KEY, { expiresIn: ACCESS_TOKEN_TTL });
  const newRefreshToken = crypto.randomBytes(64).toString("hex");

  
  await phienRepo.create({phienKey:refreshToken, tkId:tk.id});

  await phienRepo.deleteToken(token);

  return { accessToken, REFRESH_TOKEN_TTL, refreshToken };
};

export const logOut = async (token) => {
  await phienRepo.deleteToken(token);
};
