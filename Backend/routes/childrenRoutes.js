const router = require("express").Router({ mergeParams: true });
const { v4: uuidv4 } = require("uuid");

const { checkAuth } = require("../util/auth");
const db = require("../util/db.js");

router.use(checkAuth);

router.get("/", (req, res) => {
  const userId = req.params.id;
  db.query(`SELECT * FROM children WHERE userId = '${userId}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ children: result });
  });
});

router.get("/:cid", (req, res) => {
  db.query(`SELECT * FROM children WHERE childId = '${req.params.cid}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ child: result[0] });
  });
});

router.post("/", (req, res) => {
  const userId = req.params.id;
  const { childName, childClass, childGender, childSchool, childRequireSponsor, childWriteUp } = req.body;

  const childId = uuidv4().replace(/-/gi, "");

  const sql = `
    INSERT INTO children 
    (childId, childName, childGender, childClass, childSchool, childRequireSponsor, childWriteUp, userId) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [childId, childName, childGender, childClass, childSchool, childRequireSponsor, childWriteUp, userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: "Child added." });
  });
});

router.patch("/:cid", (req, res) => {
  const { childName, childClass, childGender, childSchool, childRequireSponsor, childWriteUp } = req.body;

  const sql = `
    UPDATE children 
    SET childName = ?, childGender = ?, childClass = ?, childSchool = ?, childRequireSponsor = ?, childWriteUp = ?
    WHERE childId = ?
  `;

  const values = [childName, childGender, childClass, childSchool, childRequireSponsor, childWriteUp, req.params.cid];

  db.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: "Child updated." });
  });
});

router.delete("/:cid", (req, res) => {
  db.query(`DELETE FROM children WHERE childId = '${req.params.cid}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: "Child deleted." });
  });
});

module.exports = router;
