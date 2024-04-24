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
    userId: '6d498a5050b84417aadcd7c6b63a18b5'
  },
  {
    childName: "Jack",
    childAge: 10,
    childStandard: 5,
    childSchool: "Maplewood Middle School",
    childSkillCategory: 'GIFTS',
    userId: '70d0e7f979f1401a8f7906724ad9fd4a'
  },
  {
    childName: "Sophia",
    childAge: 7,
    childStandard: 2,
    childSchool: "Willow Creek Elementary",
    childSkillCategory: 'JEWELRY',
    userId: '8030776b1f294284bfdc7cb86402bd41'
  },
  {
    childName: "Ethan",
    childAge: 9,
    childStandard: 4,
    childSchool: "Cedar Grove Elementary",
    childSkillCategory: 'DECOR',
    userId: 'a4f2f8f952d94cdbb016b050d024b137'
  },
  {
    childName: "Ava",
    childAge: 6,
    childStandard: 1,
    childSchool: "Sunset Primary School",
    childSkillCategory: 'GIFTS',
    userId: 'de7f9bb8f0964ed89e00a24ec161d5e7'
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