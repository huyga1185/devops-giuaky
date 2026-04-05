import pool from '../config/db.js';

export const getSinhVienByMssv = async (mssv) => {
  const sql = "SELECT * FROM tt_sinhvien WHERE mssv = ?;";
  const [row] = await pool.execute(sql, [mssv]);
  return row[0];
};

export const createSinhVien = async (sinhVien) => {
  const { hoTen, mssv, lop } = sinhVien;
  const sql = "INSERT INTO tt_sinhvien(hoten, mssv, lop) VALUES(?, ?, ?);";
  const [row] = await pool.execute(sql, [hoTen, mssv, lop]);
  return row.insertId;
};

export const getSinhVienByTKId = async (tkId) => {
  console.log("tkId: ", tkId);
  const sql = "SELECT sv.id, sv.hoten, sv.mssv, sv.lop from tt_sinhvien AS sv JOIN tai_khoan AS tk ON sv.mssv = tk.mssv WHERE tk.id = ?;";
  const [row] = await pool.execute(sql, [tkId]);
  return row[0];
}
