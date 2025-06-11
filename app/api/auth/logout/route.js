import { NextResponse } from 'next/server';

export const POST = async () => {
  return NextResponse.json(
    { success: true, message: 'Logout successful' },
    {
      status: 200,
      headers: {
        'Set-Cookie': 'token=; Path=/; HttpOnly; Max-Age=0;',
      },
    }
  );
};
