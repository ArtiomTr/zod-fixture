import type { ZodTypeAny, z } from 'zod';
import type { Customization } from './customizations';
export declare function createFixture<ZSchema extends ZodTypeAny>(schema: ZSchema, { ignoreChecks, customizations, defaultLength, }?: {
    ignoreChecks?: boolean;
    defaultLength?: number;
    customizations?: Customization[];
}): z.infer<typeof schema>;
