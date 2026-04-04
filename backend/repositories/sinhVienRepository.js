import pool from '../config/db.js';

export const getSinhVienByMssv = async (mssv) => {
  const sql = "SELECT * FROM sinh_vien WHERE mssv = ?;";
  const [row] = await pool.execute(sql, [mssv]);
  return row[0];
};

export const createSinhVien = async (sinhVien) => {
  const { hoTen, mssv, lop } = sinhVien;
  const sql = "INSERT INTO sinh_vien(hoten, mssv, lop) VALUES(?, ?, ?);";
  await pool.execute(sql, [hoTen, mssv, lop]);
};

