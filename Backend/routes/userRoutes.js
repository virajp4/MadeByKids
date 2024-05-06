const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const { checkAuth } = require("../util/auth");
const db = require("../util/db.js");
const childrenRoutes = require("./childrenRoutes");
const cartRoutes = require("./cartRoutes");

router.use(checkAuth);

router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ users: result });
  });
});

router.get("/:id", (req, res) => {
  db.query(`SELECT * FROM users WHERE userId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ user: result[0] });
  });
});

router.use("/:id/children", childrenRoutes);
router.use("/:id/cart", cartRoutes);

router.post("/:id", (req, res) => {
  const userId = req.params.id;
  const { userName, userAddress, userRole, userEmail, userLang } = req.body;
  const cartId = uuidv4().replace(/-/gi, "");

  db.query(
    `UPDATE users SET userName = ?, userAddress = ?, userEmail = ?, userRole = ?, userLang = ?, newUser = 0, cartId = ? WHERE userId = ?`,
    [userName, userAddress, userEmail, userRole, userLang, cartId, userId],
    (err, result) => {
      if (err) {
        throw err;
      }
      db.query("INSERT INTO cart (cartId, userId) VALUES (?, ?)", [cartId, userId], (err, result) => {
        if (err) {
          throw err; // Or handle this more gracefully
        }
        res.send({ message: "User created." });
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(`DELETE FROM users WHERE userId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: "User deleted." });
  });
});

module.exports = router;
