import { APIError, User, USER_ZOD_SCHEMA } from '@sematicca/core';
import { DATABASE } from '../create-database.function';
import { isTakenEmail } from './is-taken-email.function';
import { TABLE_NAME_S_USER, TABLE_NAME_S_USER_KV } from '../table-names';
import { userToKv } from './user-to-kv.function';
import { randomUUID } from 'node:crypto';
import { Knex } from 'knex';

export const USER_TABLE_COLUMN_ALIASES = {
  user_id: DATABASE.raw('lower(hex(_u.id_user))'),
  created_at: DATABASE.raw('DATE_FORMAT(_u.created_at, "%Y-%m-%d %H:%i:%s")'),
  updated_at: DATABASE.raw('DATE_FORMAT(_u.updated_at, "%Y-%m-%d %H:%i:%s")'),
  email: '_email.v',
  password_hash: '_password_hash.v',
  pin: '_pin.v',
  full_name: '_full_name.v',
  is_active: DATABASE.raw('coalesce(_is_active.v, "true")'),
};

export const USER_TABLE_COLUMN_ALIASES_WITH_PASSWORD = {
  ...USER_TABLE_COLUMN_ALIASES,
  password_hash: '_password_hash.v',
};

export function buildUserTableJoins(db: Knex | Knex.Transaction) {
  return db
      .from('s_user as _u')
      .leftJoin('s_user_kv as _email', DATABASE.raw('_email.id_user=_u.id_user AND _email.k="email"'))
      .leftJoin('s_user_kv as _password_hash', DATABASE.raw('_password_hash.id_user=_u.id_user AND _password_hash.k="password_hash"'))
      .leftJoin('s_user_kv as _pin', DATABASE.raw('_pin.id_user=_u.id_user AND _pin.k="pin"'))
      .leftJoin('s_user_kv as _full_name', DATABASE.raw('_full_name.id_user=_u.id_user AND _full_name.k="full_name"'))
      .leftJoin('s_user_kv as _is_active', DATABASE.raw('_is_active.id_user=_u.id_user AND _is_active.k="is_active"'));
}

export function buildUserTableJoinsWithPassword(db: Knex | Knex.Transaction) {
  return buildUserTableJoins(db);
}

export function rowToUser(row: any): User {
  return {
    user_id: row.user_id || undefined,
    created_at: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at || undefined,
    updated_at: row.updated_at instanceof Date ? row.updated_at.toISOString() : row.updated_at || undefined,
    kv: {
      email: row.email ?? undefined,
      password_hash: row.password_hash ?? undefined,
      pin: row.pin ?? undefined,
      full_name: row.full_name ?? undefined,
      is_active: row.is_active === 'true' ? true : row.is_active === 'false' ? false : undefined,
    },
  };
}

export async function insertOneUser(user: User): Promise<User> {
  const parsedUser = USER_ZOD_SCHEMA.safeParse(user);
  if (!parsedUser.success) {
    const issues = parsedUser.error.issues.map(i => ({
      path: i.path,
      error: i.message,
    }));
    console.error('insertOneUser: Validation failed:', issues);
    return Promise.reject({
      status: 400,
      message: 'User validation failed',
      issues,
    } as APIError);
  }

  const data = parsedUser.data;

  const kvs = userToKv(data);
  if (kvs.length === 0) {
    return Promise.reject({
      status: 400,
      message: 'No valid user data to insert',
    } as APIError);
  }

  if (data.kv?.email) {
    const taken = await isTakenEmail(data.kv.email);
    if (taken) {
      return Promise.reject({
        status: 409,
        message: 'E-mail is already taken',
        issues: [{ path: ['kv', 'email'], error: 'E-mail is taken' }],
      } as APIError);
    }
  }

  const userId = DATABASE.fn.uuidToBin(randomUUID());

  const formatDateTime = (date?: string | null) => {
    if (!date) return new Date().toISOString().slice(0, 19).replace('T', ' ');
    return date.replace('T', ' ').slice(0, 19);
  };

  const created_at = formatDateTime(data.created_at);
  const updated_at = formatDateTime(data.updated_at ?? data.created_at);

  const tx = await DATABASE.transaction();

  try {
    await tx.insert({ id_user: userId, created_at, updated_at }).into(TABLE_NAME_S_USER);
    if (kvs.length > 0) {
      await tx
          .insert(kvs.map(kv => ({ ...kv, id_user: userId })))
          .into(TABLE_NAME_S_USER_KV);
    }
    const row = await buildUserTableJoins(tx)
        .where('_u.id_user', userId)
        .first(USER_TABLE_COLUMN_ALIASES);

    if (!row) {
      await tx.rollback();
      return Promise.reject({
        status: 500,
        message: 'User created but could not be retrieved',
      } as APIError);
    }

    await tx.commit();
    const insertedUser = rowToUser(row);
    console.log('insertOneUser: Successfully created user:', insertedUser.user_id);
    return insertedUser;
  } catch (error: any) {
    await tx.rollback();
    console.error('insertOneUser: Transaction failed:', error);
    return Promise.reject({
      status: 500,
      message: 'Failed to create user',
      details: error.message,
    } as APIError);
  }
}