const { v4: uuidv4 } = require('uuid');

const pId = uuidv4().replace(/-/gi, '');

console.log(pId);