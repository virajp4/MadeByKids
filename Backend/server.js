const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 5000;
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "testdb",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
}); 

app.post('/register', (req, res)=> {
  const userPhone = req.body.userPhone;
  const userPassword = req.body.userPassword;
  const saltRound = 10;
  bcrypt.hash(userPassword,saltRound, (err, hashPassword) => {
    if (err) {
             console.log(err)
         }
        db.execute("INSERT INTO users1 (username, password) VALUES (?,?)", [userPhone, hashPassword], (err, result)=> {
        console.log(err);
        }
      );
  });
});

app.post('/login', (req, res) => {
  const userPhone = req.body.userPhone;
  const userPassword = req.body.userPassword;
  
  db.execute("SELECT * FROM users1 WHERE userPhone = ?;", [userPhone], (err, result)=> {
          if (err) {
              res.send({err: err});
          }
          if (result.length > 0) {
            bcrypt.compare(userPassword, result[0].userPassword, (error, response) => {
              if (response) {
                  res.send(result);
              } else{
                  res.send({message: "Wrong username/ password comination!"}); 
              }
          });
    } else res.send({message: "User doesn't exist!"});
          }
  );
 });

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/users/:id", (req, res) => {
  db.query(`SELECT * FROM users WHERE userId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/users", (req, res) => {
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

app.delete("/users/:id", (req, res) => {
  db.query(`DELETE FROM users WHERE userId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/children", (req, res) => {
  db.query("SELECT * FROM children", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/children/:id", (req, res) => {
  db.query(`SELECT * FROM children WHERE childId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/children", (req, res) => {
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

app.delete("/children/:id", (req, res) => {
  db.query(`DELETE FROM children WHERE childId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/shop", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/shop/:id", (req, res) => {
  db.query(`SELECT * FROM products WHERE productId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/shop/new", (req, res) => {
  const { productName, productPrice, productDetails, childId } = req.body;
  const productId = uuidv4().replace(/-/gi, "");
  db.query(
    `INSERT INTO products (productId, productName, productPrice, productDetails, childId) VALUES ('${productId}', '${productName}', ${productPrice}, '${productDetails}', '${childId}')`,
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    }
  );
});

app.delete("/shop/:id", (req, res) => {
  db.query(`DELETE FROM products WHERE productId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/reviews", (req, res) => {
  db.query("SELECT * FROM reviews", (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.get("/reviews/:id", (req, res) => {
  db.query(`SELECT * FROM reviews WHERE reviewId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/reviews", (req, res) => {
  const { reviewDetails, productId } = req.body;
  const reviewId = uuidv4().replace(/-/gi, "");
  db.query(`INSERT INTO reviews (reviewId, reviewDetails, productId) VALUES ('${reviewId}', '${reviewDetails}', '${productId}')`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.delete("/reviews/:id", (req, res) => {
  db.query(`DELETE FROM reviews WHERE reviewId = '${req.params.id}'`, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.listen(port, () => {
});
