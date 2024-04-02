
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 20
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 20
  },
  username: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
  },
  email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
  },
  Hpassword: {
      type: String,
      required: true
  },
  role: {
      type: String,
      enum: ['user','admin','super-admin'],
      default: 'user'
  },
  contactnumber: {
      type: String
  },
  profilepicture:{
      type: String
  }
}, { timestamps: true });


userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`;
});

userSchema.methods = {
    authenticate: async function(password){
        return await bcrypt.compare(password, this.Hpassword);
    }
}

module.exports = mongoose.model("User",userSchema);
