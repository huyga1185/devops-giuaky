import pool from '../config/db.js';

export const getSinhVienByMssv = async (mssv) => {
  const sql = "SELECT * FROM sinh_vien WHERE mssv = ?;";
  const [row] = pool.execute(sql, [mssv]);
  return row[0];
};
