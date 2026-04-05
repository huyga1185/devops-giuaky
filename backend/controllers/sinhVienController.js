import * as svService from '../services/sinhVienService.js';

export const getAbout = async (req, res) => {
  const user = req.user;
  console.log(user);
  try {
    const sv = await svService.getAbout(user);
    return res.status(200).json({hoten:sv.hoten, mssv:sv.mssv, lop:sv.lop});
  } catch (err) {
    return res.status(400).json({status:err.message});
  }
};

export const createSinhVien = async (req, res) => {
  const sinhVien = req.body;
  
  if (!sinhVien.hoTen || !sinhVien.mssv || !sinhVien.lop) {
    return res.status(400).json({message:"Bad request"});
  }

  try {
    const id = await svService.createSinhVien(sinhVien);
    return res.status(201).json({message:"SinhVien created", id});
  } catch(err) {
    console.log(err);
    return res.status(400).json({message:err.message});
  }
};
