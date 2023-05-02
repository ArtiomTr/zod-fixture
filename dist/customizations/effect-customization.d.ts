import type { Customization } from './customization';
import type { Effect } from 'zod';
type EffectContext<T> = {
    effect: Effect<T>;
    inner: {
        path: string[];
        type: string;
        create: () => T;
    };
};
export declare const effectCustomization: () => Customization<EffectContext<unknown>>;
export {};
