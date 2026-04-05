import * as svRepo from '../repositories/sinhVienRepository.js';

export const getAbout = async (user) => {
  const { id } = user;
  const sv = await svRepo.getSinhVienByTKId(id);
  if (!sv) {
    throw new Error("SV or TK not found");
  }
  return sv;
};

export const createSinhVien = async (sinhVien) => {
  const { hoTen, mssv, lop } = sinhVien;

  const sv = await svRepo.getSinhVienByMssv(mssv);

  if (!sv) {
    const id = await svRepo.createSinhVien(sinhVien);
    return id;
  } else {
    throw new Error("SV existed");
  }
};
