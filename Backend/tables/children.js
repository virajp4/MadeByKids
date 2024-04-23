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

const childrenData = [
  {
    childName: "Emily",
    childAge: 8,
    childStandard: 3,
    childSchool: "Oakridge Elementary",
    childSkillCategory: 'EMBROIDERY',
    userId: '3ed1c13e708e4beba98692c18378ea64'
  },
  {
    childName: "Jack",
    childAge: 10,
    childStandard: 5,
    childSchool: "Maplewood Middle School",
    childSkillCategory: 'GIFTS',
    userId: '6caea5045cf14ceeb0b985ef5fc806e9'
  },
  {
    childName: "Sophia",
    childAge: 7,
    childStandard: 2,
    childSchool: "Willow Creek Elementary",
    childSkillCategory: 'JEWELRY',
    userId: '3ed1c13e708e4beba98692c18378ea64'
  },
  {
    childName: "Ethan",
    childAge: 9,
    childStandard: 4,
    childSchool: "Cedar Grove Elementary",
    childSkillCategory: 'DECOR',
    userId: '6caea5045cf14ceeb0b985ef5fc806e9'
  },
  {
    childName: "Ava",
    childAge: 6,
    childStandard: 1,
    childSchool: "Sunset Primary School",
    childSkillCategory: 'GIFTS',
    userId: '6caea5045cf14ceeb0b985ef5fc806e9'
  }
];

const childrenList = childrenData.map(user => {
  const childId = uuidv4().replace(/-/gi, '');
  return [childId, user.childName, user.childAge, user.childStandard, user.childSchool, user.childSkillCategory, user.userId];
});

function seedChildrenDb() {
  const sql = 'INSERT INTO children (childId, childName, childAge, childStandard, childSchool, childSkillCategory, userId) VALUES ?';
  db.query(sql, [childrenList], (err) => {
    if (err) {
      throw err;
    }
    console.log('Data inserted into table');
  });
}

function deleteChildrenTable(){
  db.query('DROP TABLE IF EXISTS children', (err) => {
      if (err) {
        throw err;
      }
  });
}

function createChildrenTable() {
    db.query("CREATE TABLE children (childId char(36) NOT NULL PRIMARY KEY, childName VARCHAR(255), childAge INT, childStandard INT, childSchool varchar(255), childSkillCategory SET('EMBROIDERY', 'GIFTS', 'DECOR', 'JEWELRY'), userId char(36), FOREIGN KEY (userId) REFERENCES users(userId))", (err, result) => {
        if (err) {
          throw err;
        }
    });
}

deleteChildrenTable();
createChildrenTable();
seedChildrenDb();

db.end();