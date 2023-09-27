const { body, validationResult } = require("express-validator");

const productValidationParams = [
  body("imageUrl")
    .notEmpty()
    .isString()
    .isURL()
    .withMessage("Image URL must be a valid URL string"),

  body("price")
    .notEmpty()
    .isFloat({ min: 0.01, max: 9999.99 })
    .withMessage("Price must be a valid positive number with a maximum of 9999.99"),

  body("name")
    .notEmpty()
    .isString()
    .isLength({ max: 50 })
    .withMessage("Name is required and must be less than or equal to 50 characters"),

  body("description")
    .notEmpty()
    .isString()
    .isLength({ max: 30 })
    .withMessage("Description must be a string and must be less than or equal to 30 characters"),

  body("brand")
    .notEmpty()
    .isString()
    .withMessage("Brand must be a string"),

    body("author")
    .notEmpty()
    .isString()
    .isLength({ max: 8 })
    .withMessage("Author is required and must be less than or equal to 8 characters"),
];

const validateProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { productValidationParams, validateProduct };


