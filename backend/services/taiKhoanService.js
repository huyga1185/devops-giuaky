import * as tkRepo from '../repositories/taiKhoanRepository.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = 10;

export const createDefaultAdmin = async () => {
  const msAdmin = process.env.ADMIN || 0;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin@admin.admin'; 
 
  const hashedPassword = bcrypt.hash(adminPassword, saltRounds);
 
  const tk = await 

  await tkRepo.createTaiKhoan({mssv:msAdmin, hashedPassword});


};
