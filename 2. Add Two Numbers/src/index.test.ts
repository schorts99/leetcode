import { test } from "node:test";
import assert from "node:assert/strict";

import { ListNode, addTwoNumbers } from "./index.ts";

function arrayToListNode(array: Array<number>): ListNode {
	let listNode;

	for (let index = array.length; index > 0; index--) {
		listNode = new ListNode(array[index - 1], listNode);
	}

	return listNode!;
}

function listNodeToArray(listNode: ListNode | null): Array<number> {
	const array: Array<number> = [];

	while(listNode) {
		array.push(listNode.val);

		listNode = listNode.next;
	}

	return array;
}

test("case 1", () => {
	const l1 = [2, 4, 3];
	const l2 = [5, 6, 4];
	const expected = [7, 0, 8];

	assert.deepStrictEqual(
		listNodeToArray(
			addTwoNumbers(
				arrayToListNode(l1),
				arrayToListNode(l2)
			)!,
		),
		expected,
	);
});

test("case 2", () => {
	const l1 = [0];
	const l2 = [0];
	const expected = [0];

	assert.deepStrictEqual(
		listNodeToArray(
			addTwoNumbers(
				arrayToListNode(l1),
				arrayToListNode(l2)
			)!,
		),
		expected,
	);
});

test("case 3", () => {
	const l1 = [9, 9, 9, 9, 9, 9, 9];
	const l2 = [9, 9, 9, 9];
	const expected =  [8, 9, 9, 9, 0, 0, 0, 1];

	assert.deepStrictEqual(
		listNodeToArray(
			addTwoNumbers(
				arrayToListNode(l1),
				arrayToListNode(l2)
			)!,
		),
		expected,
	);
});
