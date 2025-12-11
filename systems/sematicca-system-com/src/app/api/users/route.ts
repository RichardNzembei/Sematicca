import { NextRequest } from 'next/server';
import { handleAPIError, User, USER_ZOD_SCHEMA } from '@sematicca/core';
import { insertOneUser, selectUsersPage } from '@sematicca/knex';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    return handleAPIError(async () => {
        const body = await req.json();
        if (body.kv?.password_hash && !body.kv?.password) {
            return Promise.reject({
                status: 400,
                message: 'Send "password" field, not "password_hash"',
                issues: [{path: 'kv.password', message: 'Password is required'}]
            });
        }
        const plainPassword = body.kv?.password;
        if (!plainPassword) {
            return Promise.reject({
                status: 400,
                message: 'Password is required',
                issues: [{path: 'kv.password', message: 'Password is required'}]
            });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        body.kv.password_hash = hashedPassword;
        delete body.kv.password;
        const validation = USER_ZOD_SCHEMA.safeParse(body);
        if (!validation.success) {
            const issues = validation.error.issues.map((issue) => ({
                path: issue.path.join('.'),
                message: issue.message,
            }));
            return Promise.reject({
                status: 400,
                message: 'Invalid user data',
                issues: issues
            });
        }

        const userData = body as User;
        const user = await insertOneUser(userData);
        if (user.kv?.password_hash) {
            delete user.kv.password_hash;
        }
        return Response.json(user, {status: 201});
    });
}
export async function GET(req: NextRequest) {
    return handleAPIError(async () => {
        const page = await selectUsersPage({
            page: parseInt(req.nextUrl.searchParams.get('page') || '1'),
            size: parseInt(req.nextUrl.searchParams.get('size') || '20'),
            q: req.nextUrl.searchParams.get('q') || '',
        });

        return Response.json(page, { status: 200 });
    });
}