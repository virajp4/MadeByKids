const mysql = require("mysql");

const db = require("./connectdb");

function childTable(val) {
  const create =
    "CREATE TABLE IF NOT EXISTS children (childId char(36) NOT NULL PRIMARY KEY, childName VARCHAR(255), childAge INT, childStandard INT, childSchool varchar(255), childSkillCategory SET('EMBROIDERY', 'GIFTS', 'DECOR', 'JEWELRY'), userId char(36), FOREIGN KEY (userId) REFERENCES users(userId))";
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
    "CREATE TABLE IF NOT EXISTS products (productId char(36) NOT NULL PRIMARY KEY, productName VARCHAR(25), productPrice FLOAT, productDetails varchar(255), childId char(36), FOREIGN KEY (childId) REFERENCES children(childId))";
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
    "CREATE TABLE IF NOT EXISTS users (userId char(36) NOT NULL PRIMARY KEY, userName VARCHAR(255), userPhone char(10), userPassword varchar(255), userOccupation varchar(255), userAddress varchar(255), userCity varchar(20), userPinCode int(6), userRole SET('BUYER', 'PARENT'))";
  const del = "DROP TABLE IF EXISTS users";

  const command = val === 0 ? del : create;
  db.query(command, (err, result) => {
    if (err) {
      throw err;
    }
  });
}

function deleteTables() {
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
  console.log("Tables created");
}

module.exports = { createTables, deleteTables };
