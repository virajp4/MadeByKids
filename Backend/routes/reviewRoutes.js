const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const db = require("../util/connectdb.js");

router.get("/", (req, res) => {
  db.query(`SELECT * FROM reviews WHERE productId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

router.get("/:rid", (req, res) => {
  db.query(`SELECT * FROM reviews WHERE reviewId = '${req.params.rid}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const { productId } = req.params.id;
  const { reviewDetails } = req.body;
  const reviewId = uuidv4().replace(/-/gi, "");
  db.query(`INSERT INTO reviews (reviewId, reviewDetails, productId) VALUES ('${reviewId}', '${reviewDetails}', '${productId}')`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

router.delete("/:rid", (req, res) => {
  db.query(`DELETE FROM reviews WHERE reviewId = '${req.params.rid}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

module.exports = router;
