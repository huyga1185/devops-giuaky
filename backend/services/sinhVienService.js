import * as svRepo from '../repositories/sinhVienRepository.js';

export const getAbout = async (user) => {
  const { tkId } = user;
  const tk = await svRepo.getSinhVienById(tkId);
  if (!tk) {
    throw new Error("TK not found");
  }
  return tk;
}
