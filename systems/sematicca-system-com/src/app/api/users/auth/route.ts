import { NextRequest } from 'next/server';
import { APIError, AccessToken } from '@sematicca/core';
import { selectUserIdAndPasswordByEmail, selectOneUserByUserId } from '@sematicca/knex';
import { handleAPIError } from '@sematicca/core';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error('JWT_SECRET not set');

export async function POST(req: NextRequest) {
  return handleAPIError(async () => {
    const body = await req.json();
    const {email, password} = body;
    if (!email || !password) {
      throw {
        status: 400,
        message: 'Email and password are required',
        issues: [{message: 'Email and password are required'}]
      } as APIError;
    }

    const normalizedEmail = email.trim().toLowerCase();
    let userCredentials;
    try {
      userCredentials = await selectUserIdAndPasswordByEmail(normalizedEmail);
    } catch (error) {
      throw {
        status: 401,
        message: 'Invalid email or password',
        issues: [{message: 'Invalid email or password'}]
      } as APIError;
    }

    const {user_id, password: hashedPassword} = await selectUserIdAndPasswordByEmail(normalizedEmail);
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw {
        status: 401,
        message: 'Invalid email or password',
        issues: [{message: 'Invalid email or password'}]
      } as APIError;
    }
    const fullUser = await selectOneUserByUserId(user_id);

    // Generate JWT token
    const token = jwt.sign(
        {user_id, email: normalizedEmail},
        JWT_SECRET,
        {expiresIn: '7d'}
    );

    const accessToken: AccessToken = {
      token,
      expires_in: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      user: fullUser,
    };
    return Response.json(accessToken);
  });
}