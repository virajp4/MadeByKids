const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'testdb'
  });

db.connect((err) => {
    if (err) {
      throw err;
    }
});

const productData = [
  {
    productName: "Toy Car",
    productPrice: 15.99,
    productDetails: "Remote-controlled car with LED lights",
    childId: '57b9970648c8457887e9c570457d7857'
  },
  {
    productName: "Dollhouse",
    productPrice: 49.99,
    productDetails: "Wooden dollhouse with furniture and dolls",
    childId: '886e9df792384ac28acbd48127184195'
  },
  {
    productName: "Building Blocks",
    productPrice: 24.99,
    productDetails: "Set of colorful building blocks for creative play",
    childId: 'aa4b1cb6fbce493fbfa3c5b3d91089ae'
  },
  {
    productName: "Art Set",
    productPrice: 19.99,
    productDetails: "Painting and drawing set with various tools and colors",
    childId: 'b2e84466f9314f7d90d2e16c764c1699'
  },
  {
    productName: "Board Game",
    productPrice: 29.99,
    productDetails: "Family-friendly board game for multiple players",
    childId: 'ea725328a19843d29de71dfaf2b1136f'
  }
];

const productList = productData.map(user => {
  const productId = uuidv4().replace(/-/gi, '');
  return [ productId, user.productName, user.productPrice, user.productDetails, user.childId ];
});

function deleteProductTable(){
    db.query('DROP TABLE IF EXISTS products', (err) => {
        if (err) {
          throw err;
        }
    });
}

function seedProductDb() {
  const sql = 'INSERT INTO products (productId, productName, productPrice, productDetails, childId) VALUES ?';
  db.query(sql, [productList], (err) => {
    if (err) {
      throw err;
    }
    console.log('Data inserted into table');
  });
}

function createProductTable() {
    db.query('CREATE TABLE IF NOT EXISTS products (productId char(36) NOT NULL PRIMARY KEY, productName VARCHAR(25), productPrice FLOAT, productDetails varchar(255), childId char(36), FOREIGN KEY (childId) REFERENCES children(childId))', (err, result) => {
        if (err) {
          throw err;
        }
    });
}

deleteProductTable();
createProductTable();
seedProductDb();

db.end();