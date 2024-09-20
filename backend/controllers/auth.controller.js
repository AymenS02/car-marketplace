import { generateTokenAndSetCookie } from '../lib/utils/generateToken.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
  try {
    const {fullName, username, email, password} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email is not in a valid format'
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        error: 'Username is already taken'
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        error: 'Email is already taken'
      });
    }

    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword
    });

    if(newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        profileImg: newUser.profileImg,
        bio: newUser.bio,
        link: newUser.link
      });
    } else {
      return res.status(400).json({
        error: 'Error saving user in database'
      });
    }
    
  } catch (error) {
    console.error('Error on signup', error);
    return res.status(500).json({
      error: 'Internal Server Error'
    });
  }
}

export const login = async (req, res) => {
  res.json({
    data: 'You hit the signup endpoint!'
  });
}

export const logout = async (req, res) => {
  res.json({
    data: 'You hit the signup endpoint!'
  });
}