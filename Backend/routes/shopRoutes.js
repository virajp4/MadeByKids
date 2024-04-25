const router = require("express").Router();

const db = require("../util/connectdb.js");
const reviewRoutes = require("./reviewRoutes");

router.use("/:id/reviews", reviewRoutes);

router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  db.query(`SELECT * FROM products WHERE productId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

router.post("/new", (req, res) => {
  const { productName, productPrice, productDetails, childId } = req.body;
  const productId = uuidv4().replace(/-/gi, "");
  db.query(
    `INSERT INTO products (productId, productName, productPrice, productDetails, childId) VALUES ('${productId}', '${productName}', ${productPrice}, '${productDetails}', '${childId}')`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(`DELETE FROM products WHERE productId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

module.exports = router;