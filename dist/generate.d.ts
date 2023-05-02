import type { Context } from './context';
import type { ZodTypeAny, z } from 'zod';
export declare function generate<ZSchema extends ZodTypeAny>(schema: ZSchema, context: Context): z.infer<typeof schema>;
