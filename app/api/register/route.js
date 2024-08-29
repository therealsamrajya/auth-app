import { NextResponse } from "next/server";
import { addUser,findUser
 } from "../../../lib/users";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (findUser(username)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    addUser({ username, password }); // In a real app, hash the password before storing

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
