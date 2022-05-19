const { Conflict } = require("http-errors");
const { nanoid } = require("nanoid");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  const newUser = new User({ email, avatarURL, verificationToken });
  newUser.setPassword(password);

  await newUser.save();

  const registrationMail = {
    to: email,
    subject: 'Registration confirm',
    html: `<a href = "http://localhost:3000/api/users/verify/${verificationToken}">Click it to confirm a registration</a>`
  }
  sendEmail(registrationMail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        verificationToken,
      },
    },
  });
};
module.exports = signup;
