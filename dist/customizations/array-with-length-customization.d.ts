import type { Customization } from './customization';
export declare const arrayWithLengthCustomization: () => Customization<{
    length: number;
    create: () => unknown;
}>;
