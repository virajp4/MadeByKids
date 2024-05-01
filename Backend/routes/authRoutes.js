const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

const db = require("../util/db.js");
const { isValidPhone, isValidPassword } = require("../util/validation.js");
const { createJSONToken, validatePassword, hashPassword } = require("../util/auth.js");

router.post("/register", async (req, res, next) => {
  const { userPhone, userPassword } = req.body;

  let errors = {};

  if (!isValidPhone(userPhone)) errors.phone = "Invalid phone number.";
  if (!isValidPassword(userPassword)) errors.password = "Invalid password. Must be 6 characters long.";

  db.query("SELECT * FROM users WHERE userPhone = ?", [userPhone], async (err, results) => {
    if (err) throw err;
    if (results[0]) errors.exists = "Phone number already exists.";

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        message: "User signup failed due to validation errors.",
        errors,
      });
    } else {
      try {
        const hashedPassword = await hashPassword(userPassword);
        const userId = uuidv4().replace(/-/gi, "");
        const authToken = createJSONToken(userId);

        db.query("INSERT INTO users (userId, userPhone, userPassword, newUser) VALUES (?, ?, ?, ?)", [userId, userPhone, hashedPassword, 1]);
        res.status(201).send({ message: "User created.", token: authToken });
      } catch (error) {
        next(error);
      }
    }
  });
});

router.post("/login", async (req, res) => {
  const { userPhone, userPassword } = req.body;
  let user;

  db.query("SELECT * FROM users WHERE userPhone = ?", [userPhone], async (err, result) => {
    if (err) {
      throw err;
    }
    user = result[0];
    if (!user) return res.status(404).send({ message: "User not found." });

    const validPassword = await validatePassword(userPassword, user.userPassword);
    if (!validPassword)
      return res.status(422).send({ message: "Invalid credentials.", errors: { credentials: "Invalid phone or password entered." } });

    const token = createJSONToken(user.userId);
    res.status(200).send({ message: "User logged in.", token });
  });
});

module.exports = router;
