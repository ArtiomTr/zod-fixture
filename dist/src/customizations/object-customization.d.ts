import type { Customization } from './customization';
export declare const objectCustomization: () => Customization<{
    shape: Record<string, {
        type: string;
        create: () => unknown;
    }>;
}>;
