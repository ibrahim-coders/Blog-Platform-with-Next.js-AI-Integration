import User from '@/app/lib/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import ConnectDB from '@/app/lib/config/db';

export const POST = async req => {
  try {
    await ConnectDB();
    const body = await req.json();
    let { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email and password are required',
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid password!',
        },
        { status: 400 }
      );
    }
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

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
        message: 'Login successful',
      },
      { status: 200 }
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
