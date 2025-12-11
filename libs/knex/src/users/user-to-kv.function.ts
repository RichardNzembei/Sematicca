import { User, Kv } from '@sematicca/core';

export function userToKv(user: User) {
  const userKv = user?.kv;
  const kvs: Kv[] = [];

  if (!userKv) return kvs;

  if (userKv.email)
    kvs.push({ k: 'email', v: userKv.email.toLowerCase() });

  if (userKv.password_hash)
    kvs.push({ k: 'password_hash', v: userKv.password_hash });

  if (userKv.pin)
    kvs.push({ k: 'pin', v: userKv.pin });

  if (userKv.full_name)
    kvs.push({ k: 'full_name', v: userKv.full_name });

  if (userKv.is_active === true || userKv.is_active === false)
    kvs.push({ k: 'is_active', v: userKv.is_active.toString() });

  return kvs;
}