import * as svRepo from '../repositories/sinhVienRepository.js';

export const getAbout = async (user) => {
  const { tkId } = user;
  const sv = await svRepo.getSinhVienByTKId(tkId);
  if (!sv) {
    throw new Error("SV or TK not found");
  }
  return sv;
};

export const createSinhVien = async (sinhVien) => {
  const { hoTen, mssv, lop } = sinhVien;

  const sv = await svRepo.getSinhVienByMSSV(mssv);

  if (!sv) {
    const id = await svRepo.createSinhVien(sinhVien);
    return id;
  } else {
    throw new Error("SV existed");
  }
};
