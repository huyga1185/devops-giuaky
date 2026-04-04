import * as svRepo from '../repositories/sinhVienRepository.js';

export const getAbout = async (user) => {
  const { tkId } = user;
  const tk = await svRepo.getSinhVienById(tkId);
  if (!tk) {
    throw new Error("TK not found");
  }
  return tk;
};

export const createSinhVien = async (sinhVien) => {
  const { hoTen, mssv, lop } = sinhVien;

  const sv = await svRepo.getSinhVienByMSSV(mssv);

  if (!sv) {
    await svRepo.createSinhVien(sinhVien);
  } else {
    throw new Error("SV existed");
  }
};
