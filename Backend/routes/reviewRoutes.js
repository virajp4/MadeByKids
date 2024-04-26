const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const { checkAuth } = require("../util/auth");
const db = require("../util/db.js");

router.get("/", (req, res) => {
  db.query(`SELECT * FROM reviews WHERE productId = '${req.params.pid}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ reviews: result });
  });
});

router.get("/:rid", (req, res) => {
  db.query(`SELECT * FROM reviews WHERE reviewId = '${req.params.rid}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ review: result[0] });
  });
});

router.use(checkAuth);

router.post("/", (req, res) => {
  const { productId } = req.params.pid;
  const { reviewDetails } = req.body;
  const reviewId = uuidv4().replace(/-/gi, "");
  db.query(`INSERT INTO reviews (reviewId, reviewDetails, productId) VALUES ('${reviewId}', '${reviewDetails}', '${productId}')`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: "Review added." });
  });
});

router.delete("/:rid", (req, res) => {
  db.query(`DELETE FROM reviews WHERE reviewId = '${req.params.rid}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: "Review deleted." });
  });
});

module.exports = router;
