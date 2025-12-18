// @sematicca/knex/select-user-id-and-password-by-email.function.ts

import { DATABASE } from "@sematicca/knex";
import { APIError, UserIdAndPassword } from "@sematicca/core";

export async function selectUserIdAndPasswordByEmail(email: string) {
    const normalizedEmail = email.trim().toLowerCase();

    const result = await DATABASE
        .from('s_user_kv as email_kv')
        .innerJoin(
            's_user_kv as password_kv',
            DATABASE.raw('password_kv.id_user = email_kv.id_user AND password_kv.k = "password_hash"')
        )
        .where('email_kv.k', 'email')
        .andWhere('email_kv.v', normalizedEmail)
        .first({
            user_id: DATABASE.raw('LOWER(HEX(email_kv.id_user))'),
            password_hash: 'password_kv.v'
        });

    if (!result) {
        throw {
            status: 401,
            message: 'Invalid email or password',
            issues: [{ message: 'Invalid email or password' }]
        } as APIError;
    }

    return {
        user_id: result.user_id,
        password: result.password_hash
    } as UserIdAndPassword;
}