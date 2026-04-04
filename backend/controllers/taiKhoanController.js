import * as tkService from '../services/taiKhoanService.js';

export const createTaiKhoan = async (req, res) => {
  const taiKhoan = req.body;
  
  if (!taiKhoan.mssv || !taiKhoan.password) {
    return res.status(400).json({message:"Bad request"});
  }

  try {
    await tkService.createTaiKhoan(taiKhoan);
    return res.status(204).send();
  } catch(err) {
    console.log(err);
    return res.status(400).json({message:err.message});
  }
};
