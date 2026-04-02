import * as svService from '../services/sinhVienService.js';

export const getAbout = async (req, res) => {
  const user = req.user;
  try {
    const sv = await svService.getAbout(user);
    return res.status(200).json({hoten:sv.hoten, mssv:sv.mssv, lop:sv.lop});
  } catch (err) {
    return res.status(400).json({status:err.message});
  }
};
