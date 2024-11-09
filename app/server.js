const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = {port_num};

const route = "/{route}";

// MariaDB 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('데이터베이스 연결 실패:', err);
  } else {
    console.log('데이터베이스에 성공적으로 연결되었습니다.');
  }
});

// route 경로로 요청이 올 경우 `public/index.html` 파일 제공
app.get(route, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 기본 정적 파일 제공 (public 폴더 전체 서빙)
app.use(express.static(path.join(__dirname, 'public')));

// 기본 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
