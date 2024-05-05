const router = require("express").Router();

const db = require("../util/db.js");
const reviewRoutes = require("./reviewRoutes");
const { checkAuth } = require("../util/auth");
const { isValidProduct } = require("../util/validation");

router.get("/", (req, res, next) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ products: result });
  });
});

router.get("/:id", (req, res, next) => {
  db.query(`SELECT * FROM products WHERE productId = '${req.params.id}'`, (err, result) => {
    if (err) {
      next(err);
    }
    res.send({ product: result[0] });
  });
});

router.use("/:pid/reviews", reviewRoutes);

router.delete("/:id", checkAuth, (req, res, next) => {
  db.query(`DELETE FROM products WHERE productId = '${req.params.id}'`, (err, result) => {
    if (err) {
      next(err);
    }
    res.send({ message: "Product deleted successfully." });
  });
});

module.exports = router;
