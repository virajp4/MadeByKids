const { z } = require("zod");

const phoneSchema = z.object({
  phone: z.string().length(10),
});

const passwordSchema = z.object({
  password: z.string().length(6),
});

const productSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  productPrice: z.number(),
  productDetails: z.string(),
  childId: z.string(),
});

const reviewSchema = z.object({
  reviewId: z.string(),
  reviewText: z.string(),
  reviewRating: z.number(),
  productId: z.string(),
});

function isValidPhone(value) {
  return phoneSchema.safeParse({ phone: value }).success;
}

function isValidPassword(value) {
  return passwordSchema.safeParse({ password: value }).success;
}

function isValidProduct(value) {
  return productSchema.safeParse(value).success;
}

function isValidReview(value) {
  return reviewSchema.safeParse(value).success;
}

exports.isValidPhone = isValidPhone;
exports.isValidPassword = isValidPassword;
exports.isValidProduct = isValidProduct;
exports.isValidReview = isValidReview;
