import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import ConnectDB from '@/app/lib/config/db';
import User from '@/app/lib/models/User';

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

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
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
