import { test } from "node:test";
import assert from "node:assert/strict";

import { twoSum } from "./index.js";

test("case 1", () => {
	const nums = [2, 7, 11, 15];
	const target = 9;
	const expected = [0, 1];

	assert.deepStrictEqual(twoSum(nums, target), expected);
});

test("case 2", () => {
	const nums = [3, 2, 4];
	const target = 6;
	const expected = [1, 2];

	assert.deepStrictEqual(twoSum(nums, target), expected);
});

test("case 3", () => {
	const nums = [3, 3];
	const target = 6;
	const expected = [0, 1];

	assert.deepStrictEqual(twoSum(nums, target), expected);
});
