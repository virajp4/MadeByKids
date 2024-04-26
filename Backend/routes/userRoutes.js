const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const { checkAuth } = require("../util/auth");
const db = require("../util/db.js");

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

router.use(checkAuth);

router.patch("/", (req, res) => {
  const { userName, userOccupation, userPhone, userAddress, userCity, userPinCode, userRole } = req.body;
  const userId = uuidv4().replace(/-/gi, "");
  db.query(
    `INSERT INTO users (userId, userName, userOccupation, userPhone, userAddress, userCity, userPinCode, userRole) VALUES ('${userId}','${userName}', '${userOccupation}', '${userPhone}', '${userAddress}', '${userCity}', ${userPinCode}, '${userRole}')`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send({ message: "User created." });
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