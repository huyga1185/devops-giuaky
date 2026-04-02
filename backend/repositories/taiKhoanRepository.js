import pool from '../config/db.js';

export const createTaiKhoan = async (taiKhoan) => {
  const { mssv, hashedPassword } = taiKhoan;

  const sql = "INSERT INTO tai_khoan(mssv, hashed_password) VALUES (?, ?);";

  await pool.execute(sql, [mssv, hashedPassword]);
};

export const getTKByMSSV = async (mssv) => {
  const sql = "SELECT * FROM tai_khoan WHERE mssv = ?;";
  const [row] = await pool.execute(sql, [mssv]);
  return row[0];
};

export const getTKById = async (id) => {
  const sql = "SELECT * FROM tai_khoan WHERE id = ?;";

  const [row] = pool.execute(sql, [id]);
  return row[0];
};
