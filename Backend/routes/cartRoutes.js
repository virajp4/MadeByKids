const router = require("express").Router({ mergeParams: true });
const { v4: uuidv4 } = require("uuid");

const { checkAuth } = require("../util/auth");
const db = require("../util/db.js");

router.use(checkAuth);

router.get("/", (req, res) => {
  const userId = req.params.id;
  const query1 = `SELECT cartId FROM users WHERE userId = ?`;
  db.query(query1, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const cartId = results[0].cartId;

    const query = `
    SELECT ci.cartDetailId, ci.quantity, p.productName, p.productPrice, p.productId, p.inventory, p.productDetails
    FROM cartItems ci
    JOIN products p ON ci.productId = p.productId
    WHERE ci.cartId = ?
  `;

    db.query(query, [cartId], (err, r) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ items: r });
    });
  });
});

router.post("/add", (req, res) => {
  const userId = req.params.id;
  const { productId, quantity } = req.body;

  const query = `SELECT cartId FROM users WHERE userId = ?`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User or cart not found" });
    }
    const cartId = results[0].cartId;

    const inventoryCheck = `SELECT inventory FROM products WHERE productId = ?`;
    db.query(inventoryCheck, [productId], (err, inventoryResults) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (inventoryResults.length === 0 || inventoryResults[0].inventory < quantity) {
        return res.status(400).json({ error: "Not enough inventory" });
      }

      const cartItemCheck = `SELECT cartDetailId, quantity FROM cartItems WHERE cartId = ? AND productId = ?`;
      db.query(cartItemCheck, [cartId, productId], (err, cartItemResults) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (cartItemResults.length > 0) {
          const existingCartItem = cartItemResults[0];
          const newQuantity = existingCartItem.quantity + quantity;
          const updateCartItem = `UPDATE cartItems SET quantity = ? WHERE cartDetailId = ?`;
          db.query(updateCartItem, [newQuantity, existingCartItem.cartDetailId], (err, updateResult) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Cart quantity updated", cartDetailId: existingCartItem.cartDetailId });
          });
        } else {
          const cartDetailId = uuidv4().replace(/-/gi, "");
          const insertQuery = `INSERT INTO cartItems (cartDetailId, cartId, productId, quantity) VALUES (?, ?, ?, ?)`;
          db.query(insertQuery, [cartDetailId, cartId, productId, quantity], (err, insertResult) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            const updateInventory = `UPDATE products SET inventory = inventory - ? WHERE productId = ?`;
            db.query(updateInventory, [quantity, productId], (err, result) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              res.json({ message: "Item added to cart", cartDetailId: cartDetailId });
            });
          });
        }
      });
    });
  });
});

router.delete("/:cartId/items/:productId", (req, res) => {
  const { cartId, productId } = req.params;
  const { quantity } = req.body;

  const cartItemCheck = `SELECT cartDetailId, quantity FROM cartItems WHERE cartId = ? AND productId = ?`;
  db.query(cartItemCheck, [cartId, productId], (err, cartItemResults) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (cartItemResults.length === 0) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    const cartItem = cartItemResults[0];
    if (cartItem.quantity <= quantity) {
      const removeQuery = `DELETE FROM cartItems WHERE cartDetailId = ?`;
      db.query(removeQuery, [cartItem.cartDetailId], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        const updateInventory = `UPDATE products SET inventory = inventory + ? WHERE productId = ?`;
        db.query(updateInventory, [cartItem.quantity, productId], (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: "Item removed from cart" });
        });
      });
    } else {
      const newQuantity = cartItem.quantity - quantity;
      const updateCartItem = `UPDATE cartItems SET quantity = ? WHERE cartDetailId = ?`;
      db.query(updateCartItem, [newQuantity, cartItem.cartDetailId], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        const updateInventory = `UPDATE products SET inventory = inventory + ? WHERE productId = ?`;
        db.query(updateInventory, [quantity, productId], (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.json({ message: "Cart quantity updated", newQuantity: newQuantity });
        });
      });
    }
  });
});

module.exports = router;
