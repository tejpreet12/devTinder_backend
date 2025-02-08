const validator = require("validator");
const bcrypt = require('bcrypt');

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

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((key) =>
    allowedEditFields.includes(key)
  );
  console.log(isEditAllowed, "IS EDIT ALLLOWED");
  if (!isEditAllowed) {
    throw new Error("Invaild Edit Request Validation Failed");
  }

  if (req.body?.emailId && !validator.isEmail(req.body?.emailId)) {
    throw new Error("Not a correct email");
  } else if (req.body?.photoUrl && !validator.isURL(req.body?.photoUrl)) {
    throw new Error("Not a correct URL!");
  } else if (req.body?.skills && !Array.isArray(req.body?.skills)) {
    throw new Error("Skills not correct");
  }

  return isEditAllowed;
};


const validateEditPassword = async (req) => {

  const isCurrentPasswordValid = await bcrypt.compare(req.body?.currentPassword, req.user?.password);
  
  if(!isCurrentPasswordValid) {
    throw new Error("Incorrect Current Password")
  }

  if(!validator.isStrongPassword(req.body?.updatedPassword)){
    throw new Error("Not Strong Password");
  }


}

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateEditPassword,
};
