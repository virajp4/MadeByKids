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
  const { name, dob, gender, class: classLevel, school, sponsorship, description } = req.body;

  const childId = uuidv4().replace(/-/gi, "");

  const sql = `
    INSERT INTO children 
    (childId, childName, childDOB, childGender, childClass, childSchool, childRequireSponsor, childWriteUp, userId) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [childId, name, dob, gender, classLevel, school, sponsorship, description, userId];

  db.query(sql, values, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: "Child added." });
  });
});

router.patch("/:cid", (req, res) => {
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

router.delete("/:cid", (req, res) => {
  db.query(`DELETE FROM children WHERE childId = '${req.params.cid}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send({ message: "Child deleted." });
  });
});

module.exports = router;
