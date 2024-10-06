require("dotenv").config();
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "Please provide phone number"],
    minlength: 10,
  },
  age: {
    type: Number,
    required: [true, "Please provide age"],
    minlength: 2,
  },
  role: {
    type: String,
    default: "user",
  },
  wishlist: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Property",
    },
  ],
});

// UserSchema.pre('save',async function() {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password,salt);
// })

// UserSchema.methods.createJWT = function () {
//   return jwt.sign({userId: this._id, name:this.name,role:this.role},process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1h' });
// }

// UserSchema.methods.comparePassword = async function(candidatePassword) {
//  const isMatch = await bcrypt.compare(candidatePassword, this.password);
//  return isMatch;
// }

module.exports = mongoose.model("UserLogin", UserSchema);
