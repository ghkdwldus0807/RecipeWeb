const Recipe = require("C:/Users/ybbso/OneDrive/바탕 화면/RecipeWeb/db/database");
//여기다 데이터베이스 링크 연결

const getAllRecipes = (req, res) => {
  const page = parseInt(req.query.page) || 1; // 요청에서 페이지 번호를 가져옴 기본값 1
  const pageSize = parseInt(req.query.pageSize) || 4; // 요청에서 페이지 크기 가져옴 기본값 4
  const offset = (page - 1) * pageSize;

  const query = `SELECT * FROM posts ORDER BY date DESC LIMIT ${pageSize} OFFSET ${offset}`;

  connection.query(query, (err, results) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else {
      connection.query(
        "SELECT COUNT(*) as totalCount FROM posts",
        (err, countResult) => {
          if (err) {
            res.status(400).send({ error: err.message });
          } else {
            const totalCount = countResult[0].totalCount;
            const totalPages = Math.ceil(totalCount / pageSize);

            res.json({
              _post_list: results,
              page: page,
              size: pageSize,
              totalPage: totalPages,
              totalCount: totalCount,
            });
          }
        }
      );
    }
  });
};

const getDetail = (req, res) => {
  const {
    params: { _post_id },
  } = req;

  const query = `SELECT posts.*, tags.tag_name
                 FROM posts
                 JOIN tags ON posts.tag_id = tags.tag_id
                 WHERE posts.post_id = ?`;

  connection.query(query, [_post_id], (err, results) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else {
      if (results.length === 0) {
        res.status(404).send({ error: "Recipe not found" });
      } else {
        res.status(200).render("detail", {
          post: results[0],
          tag_name: results[0].tag_name,
        });
      }
    }
  });
};

const createRecipe = (req, res) => {
  const { title, content, tag_name } = req.body;

  // 태그 이름을 기반으로 해당 태그의 tag_id를 검색하는 쿼리
  const tagQuery = "SELECT tag_id FROM tags WHERE tag_name = ?";
  connection.query(tagQuery, [tag_name], (err, tagResults) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else {
      if (tagResults.length === 0) {
        res.status(400).send({ error: "Invalid tag_name" });
      } else {
        const tag_id = tagResults[0].tag_id;

        // 레시피를 생성하는 쿼리
        const createQuery =
          "INSERT INTO posts (title, content, tag_id) VALUES (?, ?, ?)";
        connection.query(
          createQuery,
          [title, content, tag_id],
          (err, createResults) => {
            if (err) {
              res.status(400).send({ error: err.message });
            } else {
              const newRecipe = {
                post_id: createResults.insertId,
                title,
                content,
                tag_id,
              };
              res.status(201).json(newRecipe);
            }
          }
        );
      }
    }
  });
};

const editRecipe = (req, res) => {
  const {
    params: { _post_id },
    body: { title, content, tag_name },
  } = req;

  // 레시피를 수정하는 쿼리
  const editQuery = "UPDATE posts SET title = ?, content = ? WHERE post_id = ?";
  connection.query(
    editQuery,
    [title, content, _post_id],
    (err, editResults) => {
      if (err) {
        res.status(400).send({ error: err.message });
      } else {
        if (editResults.affectedRows === 0) {
          res.status(404).send({ error: "Recipe not found" });
        } else {
          // 태그 이름을 기반으로 해당 태그의 tag_id를 검색하는 쿼리
          const tagQuery = "SELECT tag_id FROM tags WHERE tag_name = ?";
          connection.query(tagQuery, [tag_name], (err, tagResults) => {
            if (err) {
              res.status(400).send({ error: err.message });
            } else {
              if (tagResults.length === 0) {
                res.status(400).send({ error: "Invalid tag_name" });
              } else {
                const tag_id = tagResults[0].tag_id;

                // 레시피의 tag_id를 업데이트하는 쿼리
                const updateTagQuery =
                  "UPDATE posts SET tag_id = ? WHERE post_id = ?";
                connection.query(
                  updateTagQuery,
                  [tag_id, _post_id],
                  (err, updateTagResults) => {
                    if (err) {
                      res.status(400).send({ error: err.message });
                    } else {
                      res.status(200).json({ message: "Recipe updated" });
                    }
                  }
                );
              }
            }
          });
        }
      }
    }
  );
};

const deleteRecipe = (req, res) => {
  const {
    params: { _post_id },
  } = req;

  // 레시피를 삭제하는 쿼리
  const deleteQuery = "DELETE FROM posts WHERE post_id = ?";
  connection.query(deleteQuery, [_post_id], (err, deleteResults) => {
    if (err) {
      res.status(400).send({ error: err.message });
    } else {
      if (deleteResults.affectedRows === 0) {
        res.status(404).send({ error: "Recipe not found" });
      } else {
        res.status(204).send();
      }
    }
  });
};

module.exports = {
  getAllRecipes,
  getDetail,
  createRecipe,
  editRecipe,
  deleteRecipe,
};
