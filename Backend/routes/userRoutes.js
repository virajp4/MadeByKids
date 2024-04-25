const router = require("express").Router();

const db = require("../util/connectdb.js");

router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  db.query(`SELECT * FROM users WHERE userId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const { userName, userOccupation, userPhone, userAddress, userCity, userPinCode, userRole } = req.body;
  const userId = uuidv4().replace(/-/gi, "");
  db.query(
    `INSERT INTO users (userId, userName, userOccupation, userPhone, userAddress, userCity, userPinCode, userRole) VALUES ('${userId}','${userName}', '${userOccupation}', '${userPhone}', '${userAddress}', '${userCity}', ${userPinCode}, '${userRole}')`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(`DELETE FROM users WHERE userId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

module.exports = router;