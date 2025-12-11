import { z } from 'zod';

export type User = {
    user_id?: string;
    created_at?: string;
    updated_at?: string;
    kv?: {
        email?: string;
        password_hash?: string;
        pin?: string;
        full_name?: string;
        is_active?: boolean;
    };
};

export const USER_ZOD_SCHEMA = z.object({
    user_id: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    kv: z.object({
        email: z.string().email().optional(),
        password_hash: z.string().optional(),
        full_name: z.string().optional(),
        is_active: z.boolean().optional(),
    }).optional(),
});