import { NextResponse } from 'next/server';
import { findUser } from '../../../lib/users';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const user = findUser(username);

    if (!user || user.password !== password) { // In a real app, use proper password comparison
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Set a cookie with the username as the token
    // In a real app, you would generate a proper JWT token here
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    response.cookies.set('token', username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
