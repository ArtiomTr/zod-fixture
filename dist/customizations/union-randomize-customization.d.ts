import type { Customization } from './customization';
export declare const unionRandomizeCustomization: () => Customization<{
    possibleTypes: string[];
    create: (type: string) => unknown;
}>;
