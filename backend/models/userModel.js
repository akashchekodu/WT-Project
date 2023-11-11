const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
    unique: true,
    trim: true,
    maxlength: [40, "A tour name must have less or equal then 40 characters"],
    minlength: [10, "A tour name must have more or equal then 10 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is mandatory"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  password: {
    type: String,
    minlenth: 6,
    select: false,
    required: [true, "Password is mandatory"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (e) {
        return e === this.password;
      },
      message: "Please check your password again",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Encrypting the password before saving to the database
//Middleware will be called when it's saved
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //isModified is provided by mongoose

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

//Saving the password chnagedAt
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Checking whether the entered password and password in databse is correct

userSchema.methods.correctPassword = async function (
  givenPassword,
  userPasswrod
) {
  return await bcrypt.compare(givenPassword, userPasswrod);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
