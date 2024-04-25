const { z } = require("zod");

const phoneSchema = z.object({
  phone: z.string().length(10),
});

const passwordSchema = z.object({
  password: z.string().length(6),
});

function isValidPhone(value) {
  return phoneSchema.safeParse({ phone: value }).success;
}

function isValidPassword(value) {
  return passwordSchema.safeParse({ password: value }).success;
}

exports.isValidPhone = isValidPhone;
exports.isValidPassword = isValidPassword;
