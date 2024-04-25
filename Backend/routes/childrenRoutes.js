const router = require("express").Router();

const db = require("../util/connectdb.js");

router.get("/", (req, res) => {
  db.query("SELECT * FROM children", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  db.query(`SELECT * FROM children WHERE childId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const { childName, childAge, childStandard, childSchool, childSkillCategory, userId } = req.body;
  const childId = uuidv4().replace(/-/gi, "");
  db.query(
    `INSERT INTO children (childId, childName, childAge, childStandard, childSchool, childSkillCategory, userId) VALUES ('${childId}', '${childName}', ${childAge}, ${childStandard}, '${childSchool}', '${childSkillCategory}', '${userId}')`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query(`DELETE FROM children WHERE childId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

module.exports = router;