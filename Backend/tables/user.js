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

const usersData = [
  {
    userName: "John Doe",
    userOccupation: "Software Engineer",
    userPhone: "1234567890",
    userAddress: "123 Main Street",
    userCity: "Anytown",
    userPinCode: 123456,
    userRole: 'BUYER'
  },
  {
    userName: "Jane Smith",
    userOccupation: "Teacher",
    userPhone: "9876543210",
    userAddress: "456 Elm Street",
    userCity: "Othertown",
    userPinCode: 654321,
    userRole: 'PARENT'
  },
  {
    userName: "Alice Johnson",
    userOccupation: "Doctor",
    userPhone: "5555555555",
    userAddress: "789 Oak Street",
    userCity: "Sometown",
    userPinCode: 333333,
    userRole: 'BUYER'
  },
  {
    userName: "Bob Williams",
    userOccupation: "Accountant",
    userPhone: "7778889999",
    userAddress: "101 Pine Street",
    userCity: "Smalltown",
    userPinCode: 444444,
    userRole: 'PARENT'
  },
  {
    userName: "Emily Davis",
    userOccupation: "Student",
    userPhone: "2223334444",
    userAddress: "222 Maple Street",
    userCity: "Villagetown",
    userPinCode: 555555,
    userRole: 'BUYER'
  }
];

const usersList = usersData.map(user => {
  const userId = uuidv4().replace(/-/gi, '');
  return [userId, user.userName, user.userOccupation, user.userPhone, user.userAddress, user.userCity, user.userPinCode, user.userRole];
});

function seedUserDb() {
  const sql = 'INSERT INTO users (userId, userName, userOccupation, userPhone, userAddress, userCity, userPinCode, userRole) VALUES ?';
  db.query(sql, [usersList], (err) => {
    if (err) {
      throw err;
    }
    console.log('Data inserted into table');
  });
}

function deleteUserTable(){
  db.query('DROP TABLE IF EXISTS users', (err) => {
      if (err) {
        throw err;
      }
  });
}

function createUserTable() {
    db.query("CREATE TABLE users (userId char(36) NOT NULL PRIMARY KEY, userName VARCHAR(255), userOccupation varchar(255), userPhone char(10), userAddress varchar(255), userCity varchar(20), userPinCode int(6), userRole SET('BUYER', 'PARENT'))", (err, result) => {
        if (err) {
          throw err;
        }
    });
}

deleteUserTable();
createUserTable();
seedUserDb();

db.end();