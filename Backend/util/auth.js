const { sign, verify } = require("jsonwebtoken");
const { compare, hash, genSalt } = require("bcrypt");
const { NotAuthError } = require("./errors");

const KEY = "secret";

function createJSONToken(phone) {
  return sign({ phone }, KEY, { expiresIn: "24h" });
}

function validateJSONToken(token) {
  return verify(token, KEY);
}

async function hashPassword(password) {
  const salt = await genSalt(10);
  return await hash(password, salt);
}

async function validatePassword(password, storedPassword) {
  return await compare(password, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (!req.headers.authorization) {
    console.log("NOT AUTH. AUTH HEADER MISSING.");
    return next(new NotAuthError("Not authenticated."));
  }
  const authFragments = req.headers.authorization.split(" ");
  if (authFragments.length !== 2) {
    console.log("NOT AUTH. AUTH HEADER INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }

  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.log("NOT AUTH. TOKEN INVALID.");
    return next(new NotAuthError("Not authenticated."));
  }
  next();
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.hashPassword = hashPassword;
exports.validatePassword = validatePassword;
exports.checkAuth = checkAuthMiddleware;
