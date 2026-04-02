import pool from '../config/db.js';

export const create = async (phien) => {
  const { phienKey, tkId } = phien;

  const sql = "INSERT INTO phien(phien_key, tk_id) VALUES (?, ?);";

  await pool.execute(sql, [phienKey, tkId]);
}

export const getPhienByToken = async(token) => {
  const sql = "SELECT * FROM phien WHERE phien_key = ?;";

  const [row] = await pool.execute(sql, [token]);
  return row[0];
};

export const deleteToken = async (token) => {
  const sql = 'DELETE FROM phien WHERE phien_key = ?;';
  const [row] = await pool.execute(sql, [token]);
  return row[0];
}
