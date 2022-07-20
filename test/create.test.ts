import { describe, expect, test } from 'vitest';
import type { ZodTypeAny } from 'zod';
import { create } from '../src';
import { z } from 'zod';

test('throws on invalid schema type', () => {
	const zodType = {
		_def: {
			typeName: 'I_DONT_EXIST',
		},
	} as ZodTypeAny;
	expect(() => create(zodType)).toThrowError(zodType._def.typeName);
});

describe('create strings', () => {
	test('creates a string', () => {
		expect(typeof create(z.string())).toBe('string');
	});

	test('creates a nullable string', () => {
		expect(typeof create(z.string().nullable())).toBe('string');
		expect(typeof create(z.string().nullish())).toBe('string');
		expect(typeof create(z.string().optional())).toBe('string');
	});
});

describe('create numbers', () => {
	test('creates a number between 1 and Number.MAX_SAFE_INTEGER', () => {
		const result = create(z.number());

		expect(typeof result).toBe('number');
		expect(result).toBeGreaterThanOrEqual(1);
		expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);

		Number.MAX_SAFE_INTEGER;
	});

	test('creates a nullable number', () => {
		expect(typeof create(z.number().nullable())).toBe('number');
		expect(typeof create(z.number().nullish())).toBe('number');
		expect(typeof create(z.number().optional())).toBe('number');
	});
});

describe('create booleans', () => {
	test('creates a boolean', () => {
		expect(typeof create(z.boolean())).toBe('boolean');
	});

	test('creates a nullable boolean', () => {
		expect(typeof create(z.boolean().nullable())).toBe('boolean');
		expect(typeof create(z.boolean().nullish())).toBe('boolean');
		expect(typeof create(z.boolean().optional())).toBe('boolean');
	});
});

describe('create dates', () => {
	const two_years = 31536000000 * 2;
	test('creates a date within a range of min plus 2 years from today', () => {
		const result = create(z.date());

		expect(result).toBeInstanceOf(Date);
		expect(result.getTime()).toBeGreaterThanOrEqual(
			new Date().getTime() - two_years,
		);
		expect(result.getTime()).toBeLessThanOrEqual(
			new Date().getTime() + two_years,
		);
	});

	test('creates a nullable date', () => {
		expect(create(z.date().nullable())).toBeInstanceOf(Date);
		expect(create(z.date().nullish())).toBeInstanceOf(Date);
		expect(create(z.date().optional())).toBeInstanceOf(Date);
	});
});
