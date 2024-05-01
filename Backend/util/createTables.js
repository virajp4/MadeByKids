const mysql = require("mysql");

const db = require("./db");

function childTable(val) {
  const create =
    "CREATE TABLE IF NOT EXISTS children (childId char(36) NOT NULL PRIMARY KEY, childName VARCHAR(255), childDOB DATE, childClass INT, childSchool varchar(255), childWriteUp varchar(255), childRequireSponsor SET('YES', 'NO'), childGender SET('MALE', 'FEMALE', 'PREFER NOT TO SAY'), childSkillCategory SET('EMBROIDERY', 'GIFTS', 'DECOR', 'JEWELRY'), userId char(36), FOREIGN KEY (userId) REFERENCES users(userId))";
  const del = "DROP TABLE IF EXISTS children";

  const command = val === 0 ? del : create;
  db.query(command, (err, result) => {
    if (err) {
      throw err;
    }
  });
}

function prodTable(val) {
  const create =
    "CREATE TABLE IF NOT EXISTS products (productId char(36) NOT NULL PRIMARY KEY, productName VARCHAR(25), productPrice FLOAT, productDetails varchar(255), inventory INT, childId char(36), FOREIGN KEY (childId) REFERENCES children(childId))";
  const del = "DROP TABLE IF EXISTS products";

  const command = val === 0 ? del : create;
  db.query(command, (err, result) => {
    if (err) {
      throw err;
    }
  });
}

function reviewTable(val) {
  const create =
    "CREATE TABLE IF NOT EXISTS reviews (reviewId char(36) NOT NULL PRIMARY KEY, reviewDetails varchar(255), productId char(36), FOREIGN KEY (productId) REFERENCES products(productId))";
  const del = "DROP TABLE IF EXISTS reviews";

  const command = val === 0 ? del : create;
  db.query(command, (err, result) => {
    if (err) {
      throw err;
    }
  });
}

function userTable(val) {
  const create =
    "CREATE TABLE IF NOT EXISTS users (userId char(36) NOT NULL PRIMARY KEY, userName VARCHAR(255), userPhone char(10), userPassword varchar(255), userAddress varchar(255), userCity varchar(20), userPinCode int(6), userEmail varchar(255), userRole SET('GUARDIAN', 'GUEST'), userLang SET('ENGLISH', 'TAMIL'))";
  const del = "DROP TABLE IF EXISTS users";

  const command = val === 0 ? del : create;
  db.query(command, (err, result) => {
    if (err) {
      throw err;
    }
  });
}

function cartTable(val) {
  const create =
    "CREATE TABLE IF NOT EXISTS cart (cartId char(36) NOT NULL PRIMARY KEY, userId char(36), FOREIGN KEY (userId) REFERENCES users(userId))";
  const del = "DROP TABLE IF EXISTS cart";

  const command = val === 0 ? del : create;
  db.query(command, (err, result) => {
    if (err) {
      throw err;
    }
  });
}

function cartItemsTable(val) {
  const create =
    "CREATE TABLE IF NOT EXISTS cartItems (cartDetailId char(36) NOT NULL PRIMARY KEY, cartId char(36), productId char(36), quantity INT, FOREIGN KEY (productId) REFERENCES products(productId), FOREIGN KEY (cartId) REFERENCES cart(cartId))";
  const del = "DROP TABLE IF EXISTS cartItems";

  const command = val === 0 ? del : create;
  db.query(command, (err, result) => {
    if (err) {
      throw err;
    }
  });
}

function mediaTable(val) {
  const create =
    "CREATE TABLE IF NOT EXISTS media (mediaId char(36) NOT NULL PRIMARY KEY, imageEncoded varchar(255), videoUrl varchar(255), productId char(36), userId char(36), FOREIGN KEY (productId) REFERENCES products(productId), FOREIGN KEY (userId) REFERENCES users(userId))";
  const del = "DROP TABLE IF EXISTS media";

  const command = val === 0 ? del : create;
  db.query(command, (err, result) => {
    if (err) {
      throw err;
    }
  });
}

function deleteTables() {
  mediaTable(0);
  cartItemsTable(0);
  cartTable(0);
  reviewTable(0);
  prodTable(0);
  childTable(0);
  userTable(0);
  console.log("Tables deleted");
}

function createTables() {
  userTable(1);
  childTable(1);
  prodTable(1);
  reviewTable(1);
  cartTable(1);
  cartItemsTable(1);
  mediaTable(1);
  console.log("Tables created");
}

function resetTables() {
  deleteTables();
  createTables();
  console.log("Tables reset");
}

module.exports = { resetTables };