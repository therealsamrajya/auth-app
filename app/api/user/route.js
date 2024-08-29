import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { findUser } from '../../../lib/users';

export async function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // In a real app, you would verify the token here
  // For this example, we'll just check if any user exists
  const user = findUser(token.value);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 });
  }

  return NextResponse.json({ username: user.username });
}
