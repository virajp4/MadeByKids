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

const reviewData = [
    {
      reviewDetails: "My kid loved playing with this car!",
      productId: "e0e5fa17a73040b4a2c4e636c761bd49"
    },
    {
      reviewDetails: "The dollhouse is beautifully crafted and my daughter spends hours playing with it.",
      productId: "c17a63b4dad64acc8114e207af292899"
    },
    {
      reviewDetails: "Great quality building blocks, highly recommend.",
      productId: "8aaa910eb98944eab15c76a2098ccf40"
    },
    {
      reviewDetails: "The art set was a perfect gift for my creative child.",
      productId: "66dbc10b4c2d4928b3494cfca325eee1"
    },
    {
      reviewDetails: "We had so much fun playing the board game as a family.",
      productId: "495e605d8136402eb2c62df312f50dea"
    }
  ];  

const reviewList = reviewData.map(user => {
  const reviewId = uuidv4().replace(/-/gi, '');
  return [ reviewId, user.reviewDetails, user.productId ];
});

function deleteReviewTable(){
    db.query('DROP TABLE IF EXISTS reviews', (err) => {
        if (err) {
          throw err;
        }
    });
}

function seedReviewDb() {
  const sql = 'INSERT INTO reviews (reviewId, reviewDetails, productId) VALUES ?';
  db.query(sql, [reviewList], (err) => {
    if (err) {
      throw err;
    }
    console.log('Data inserted into table');
  });
}

function createReviewTable() {
    db.query('CREATE TABLE IF NOT EXISTS reviews (reviewId char(36) NOT NULL PRIMARY KEY, reviewDetails VARCHAR(255), productId char(36), FOREIGN KEY (productId) REFERENCES products(productId))', (err, result) => {
        if (err) {
          throw err;
        }
    });
}

deleteReviewTable();
createReviewTable();
seedReviewDb();

db.end();