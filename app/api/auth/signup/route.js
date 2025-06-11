import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import ConnectDB from '@/app/lib/config/db';
import User from '@/app/lib/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
export const POST = async req => {
  try {
    await ConnectDB();
    const body = await req.json();

    let { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'All fields are required',
        },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: 'Password must be at least 6 characters',
        },
        { status: 400 }
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User already exists',
        },
        { status: 409 }
      );
    }
    const hashPassword = await bcrypt.hash(password, 6);

    const user = new User({
      name,
      email,
      password: hashPassword,
    });
    await user.save();
    // JWT token generate
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    // Cookie te token set
    const cookiesStore = await cookies();
    cookiesStore.set('token', token, {
      maxAge: 24 * 60 * 60,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      path: '/',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        user: { name: user.name, email: user.email },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
};
