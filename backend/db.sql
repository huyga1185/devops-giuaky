DROP DATABASE IF EXISTS sinhvien;
CREATE DATABASE sinhvien;

USE sinhvien;

CREATE TABLE tt_sinhvien (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hoten VARCHAR(512) NOT NULL,
  mssv VARCHAR(10) NOT NULL UNIQUE,
  lop VARCHAR(10) NOT NULL,
  role VARCHAR(10) NOT NULL DEFAULT 'SV'
);

CREATE TABLE tai_khoan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  mssv VARCHAR(10) UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  CONSTRAINT tai_khoan_mssv_tt_sinhvien_mssv FOREIGN KEY (mssv) REFERENCES tt_sinhvien(mssv)
);

CREATE TABLE phien (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phien_key VARCHAR(512) NOT NULL UNIQUE,
  tk_id INT NOT NULL,
  expires_at DATETIME NOT NULL,
  CONSTRAINT phien_tk_id_tai_khoan_id FOREIGN KEY (tk_id) REFERENCES tai_khoan(id)
)
