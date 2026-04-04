import * as tkRepo from '../repositories/taiKhoanRepository.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const saltRounds = 10;

export const createAdmin = async () => {
  const username = process.env.ADMIN || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin@admin.admin';

  const tk = await tkRepo.getTKByUsername(username);

  if (!tk) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await tkRepo.createTaiKhoanWithAdminRole({username, hashedPassword});
  }
};

export const createTaiKhoan = async (taiKhoan) => {
  const { mssv, password } = taiKhoan;
  const tk = await tkRepo.getTKByMSSV(mssv);

  if (!tk) {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await tkRepo.createTaiKhoan({ mssv, hashedPassword });
  }
};
