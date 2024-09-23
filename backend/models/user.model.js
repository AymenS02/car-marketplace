import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    
    fullName: {
      type: String,
      required: true,
      minlength: 3,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    email: {
      type: String,
      required: true,
      unique: true,  
    },

    profileImg: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
