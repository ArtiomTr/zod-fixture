import type { Customization } from './customization';
export declare const recordCustomization: () => Customization<{
    length: number;
    keyType: string;
    keyCreate: () => string | number | symbol;
    valueType: string;
    valueCreate: () => unknown;
}>;
