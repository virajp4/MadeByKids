const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const { checkAuth } = require("../util/auth");
const db = require("../util/db.js");

router.get("/", (req, res) => {
  db.query("SELECT * FROM children", (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ children: result });
  });
});

router.get("/:id", (req, res) => {
  db.query(`SELECT * FROM children WHERE childId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ child: result[0] });
  });
});

router.use(checkAuth);

router.post("/", (req, res) => {
  const { childName, childAge, childStandard, childSchool, childSkillCategory, userId } = req.body;
  const childId = uuidv4().replace(/-/gi, "");
  db.query(
    `INSERT INTO children (childId, childName, childAge, childStandard, childSchool, childSkillCategory, userId) VALUES ('${childId}', '${childName}', ${childAge}, ${childStandard}, '${childSchool}', '${childSkillCategory}', '${userId}')`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send({ message: "Child added." });
    }
  );
});

router.patch("/:id", (req, res) => {
  const { childName, childAge, childStandard, childSchool, childSkillCategory, userId } = req.body;
  db.query(
    `UPDATE children SET childName = '${childName}', childAge = ${childAge}, childStandard = ${childStandard}, childSchool = '${childSchool}', childSkillCategory = '${childSkillCategory}', userId = '${userId}' WHERE childId = '${req.params.id}'`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send({ message: "Child updated." });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(`DELETE FROM children WHERE childId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: "Child deleted." });
  });
});

module.exports = router;