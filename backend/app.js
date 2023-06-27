var express = require("express");
const renderer = require("vue-server-renderer").createRenderer();
var path = require("path");

//home, board, post 라우터 가져오기
const homeRouter = require("./routes/home");
const boardRouter = require("./routes/board");
//const postRouter = require("./routes/post");

const requestMiddleware = (req, res, next) => {
  console.log("Request URL : ", req.originalUrl, "-", new Date());
  next();
};

var app = express();
//var mysql = require("mysql2");
var port = 3000;

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "dist")));

const connection = require("C:/Users/ybbso/OneDrive/바탕 화면/RecipeWeb/db/database");

// Express 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 글 생성 API
app.post("/post", (req, res) => {
  const { title, content } = req.body;
  const query = "INSERT INTO posts (title, content) VALUES (?, ?)";

  connection.query(query, [title, content], (err, results) => {
    if (err) throw err;

    res.json({ message: "글이 생성되었습니다." });
  });
});

// 글 수정 API
app.put("/post/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = "UPDATE posts SET title = ?, content = ? WHERE id = ?";

  connection.query(query, [title, content, id], (err, results) => {
    if (err) throw err;

    res.json({ message: "글이 수정되었습니다." });
  });
});

// 글 삭제 API
app.delete("/post/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM posts WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) throw err;

    res.json({ message: "글이 삭제되었습니다." });
  });
});

app.set("views", __dirname + "/views"); //app.set("views","C:\Users\ybbso\OneDrive\바탕 화면\RecipeWeb\front\frontvue")
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("./views"));

//추가한 부분
app.use(requestMiddleware);

app.use("/home", homeRouter);
app.use("/board", boardRouter);
//app.use("/board/post", postRouter);

// app.get("/board", (req, res) => {
//   res.render("board");
// });
// app.get("/post", (req, res) => {
//   res.render("post");
// });

app.listen(port, () => {
  console.log(port, "port start");
});

//module.exports = app;
