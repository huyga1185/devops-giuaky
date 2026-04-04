import pool from '../config/db.js';

export const createTaiKhoan = async (taiKhoan) => {
  const { mssv, hashedPassword } = taiKhoan;

  const sql = "INSERT INTO tai_khoan(mssv, hashed_password) VALUES (?, ?);";

  await pool.execute(sql, [mssv, hashedPassword]);
};

export const createTaiKhoanWithAdminRole = async (taiKhoan) => {
  const { username, hashedPassword } = taiKhoan;

  const sql = "INSERT INTO tai_khoan(username, hashed_password, role) VALUES (?, ?, ?);";

  await pool.execute(sql, [username, hashedPassword, 'ADMIN']);
};

export const getTKByMSSV = async (mssv) => {
  const sql = "SELECT * FROM tai_khoan WHERE mssv = ?;";
  const [row] = await pool.execute(sql, [mssv]);
  return row[0];
};

export const getTKById = async (id) => {
  const sql = "SELECT * FROM tai_khoan WHERE id = ?;";

  const [row] = await pool.execute(sql, [id]);
  return row[0];
};

export const getTKByUsername = async (username) => {
  const sql = "SELECT * FROM tai_khoan WHERE username = ?;";

  const [row] = await pool.execute(sql, [username]);
  return row[0];
};
