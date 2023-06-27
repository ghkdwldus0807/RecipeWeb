const mysql = require("mysql2");

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Thdms1431&*",
  database: "recipe",
});

// 연결 확인
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database: ", error);
  } else {
    console.log("Connected to the database!");
  }
});

// 연결 객체를 내보냅니다.
module.exports = connection;
