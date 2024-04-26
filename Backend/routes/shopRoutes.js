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
router.use(checkAuth);

router.post("/", (req, res, next) => {
  const { productName, productPrice, productDetails, childId } = req.body;
  const productId = uuidv4().replace(/-/gi, "");
  const product = { productId, productName, productPrice, productDetails, childId };

  if (!isValidProduct(product)) {
    return res.status(400).json({ message: "Invalid product data." });
  }

  db.query(
    `INSERT INTO products (productId, productName, productPrice, productDetails, childId) VALUES ('${productId}', '${productName}', ${productPrice}, '${productDetails}', '${childId}')`,
    (err, result) => {
      if (err) {
        next(err);
      }
      res.send({ message: "Product added.", product });
    }
  );
});

router.patch("/:id", (req, res) => {
  const { productName, productPrice, productDetails, childId } = req.body;
  const product = { productName, productPrice, productDetails, childId };

  if (!isValidProduct(product)) {
    return res.status(400).json({ message: "Invalid product data." });
  }

  db.query(
    `UPDATE products SET productName = '${productName}', productPrice = ${productPrice}, productDetails = '${productDetails}', childId = '${childId}' WHERE productId = '${req.params.id}'`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.json({ message: "Product updated." });
    }
  );
});

router.delete("/:id", (req, res, next) => {
  db.query(`DELETE FROM products WHERE productId = '${req.params.id}'`, (err, result) => {
    if (err) {
      next(err);
    }
    res.json({ message: "Product deleted." });
  });
});

module.exports = router;
