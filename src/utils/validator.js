const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  console.log(req.body);

  if (!firstName || !lastName) {
    throw new Error("First Name & Last Name is Required");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Not a strong password");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Not a correct email ");
  }
};

module.exports = {
  validateSignUpData,
};
