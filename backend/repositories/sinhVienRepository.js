import pool from '../config/db.js';

export const getSinhVienByMssv = async (mssv) => {
  const sql = "SELECT * FROM sinh_vien WHERE mssv = ?;";
  const [row] = await pool.execute(sql, [mssv]);
  return row[0];
};

export const createSinhVien = async (sinhVien) => {
  const { hoTen, mssv, lop } = sinhVien;
  const sql = "INSERT INTO sinh_vien(hoten, mssv, lop) VALUES(?, ?, ?);";
  const [row] = await pool.execute(sql, [hoTen, mssv, lop]);
  return row.insertId;
};

export const getSinhVienByTKId = async (tkId) => {
  const sql = "SELECT sv.id, sv.hoten, sv.mssv, sv.lop from sinh_vien AS sv JOIN tai_khoan AS tk ON sv.mssv = tk.mssv WHERE tk.id = ?;";
  const [row] = await pool.execute(sql, [tkId]);
  return row[0];
}
