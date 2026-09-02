# 2. Add Two Numbers

Author(s): [Jorge Castillo](https://github.com/schorts99)  
Status: Completed  
Last Updated: Sep 02, 2026

## Table of Contents

- [Summary](#summary)
- [Goals](#goals)
- [Non-Goals](#non-goals)
- [Context](#context)
- [Proposed Solution](#proposed-solution)
- [Architecture & Design](#architecture--design)
- [API / Interface Changes](#api--interface-changes)
- [Testing & Validation](#testing--validation)
- [Alternatives Considered](#alternatives-considered)
- [Future Considerations](#future-considerations)
- [References](#references)

## Summary

This document describes a linked-list-based solution to the classic Add Two Numbers problem: given two linked lists representing two non-negative integers in reverse digit order, return a linked list representing their sum, also in reverse digit order.

The implementation traverses both linked lists simultaneously and calculates each resulting digit while maintaining a carry value in `remaining`.

The solution supports input lists with different lengths by treating a missing node as `0`.

## Goals

- Add two numbers represented by linked lists.
- Return the result as a linked list in reverse digit order.
- Support linked lists with different lengths.
- Correctly handle carry values between digits.
- Handle a final carry after both lists have been processed.
- Traverse the input lists in a single pass.
- Avoid converting the linked lists into JavaScript numbers.

## Non-Goals

- Finding multiple sums or combinations.
- Supporting negative numbers.
- Supporting floating-point values.
- Modifying the input linked lists.
- Converting the complete linked lists into JavaScript numbers.
- Supporting numbers represented in forward digit order.

## Context

The Add Two Numbers problem represents each number using a singly linked list where every node contains a single digit.

The digits are stored in reverse order.

For example:

```text
l1 = 2 → 4 → 3
```

represents:

```text
342
```

while:

```text
l2 = 5 → 6 → 4
```

represents:

```text
465
```

Therefore:

```text
342 + 465 = 807
```

The expected result is:

```text
7 → 0 → 8
```

Because the least significant digit is stored first, the addition can be performed directly by traversing the lists from their heads.

## Proposed Solution

The implementation maintains:

* `listNode` as the starting node for constructing the result.
* `currentListNode` as the current position in the result list.
* `remaining` as the carry from the previous addition.

For every iteration:

1. Read the current value from `l1`, using `0` if `l1` is `null`.
2. Read the current value from `l2`, using `0` if `l2` is `null`.
3. Add both values and the current `remaining` value.
4. Calculate the new `remaining` carry.
5. Create a new node containing the resulting digit.
6. Move `currentListNode` to the newly created node.
7. Advance `l1` and `l2`.
8. Continue while either list still has nodes or a carry remains.

The implementation is:

```ts
export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
	const listNode = new ListNode(0);
	let currentListNode = listNode;
	let remaining = 0;

	while (l1 || l2 || remaining > 0) {
		const val1 = l1?.val ?? 0;
		const val2 = l2?.val ?? 0;
		
		const val = val1 + val2 + remaining;
		remaining = Math.floor(val / 10);
		
		currentListNode.next = new ListNode(val % 10);
		currentListNode = currentListNode.next;
		
		l1 = l1?.next ?? null;
		l2 = l2?.next ?? null;
	}

	return listNode.next;
}
```

### Digit Calculation

The sum for each position is calculated with:

```ts
const val = val1 + val2 + remaining;
```

The carry for the next position is calculated with:

```ts
remaining = Math.floor(val / 10);
```

The digit stored in the current node is calculated with:

```ts
val % 10
```

For example:

```text
9 + 8 = 17
```

produces:

```text
digit = 7
remaining = 1
```

The carry is then included in the next iteration.

### Different List Lengths

The implementation handles lists with different lengths by using:

```ts
const val1 = l1?.val ?? 0;
const val2 = l2?.val ?? 0;
```

When one list has already reached `null`, its value becomes `0`.

For example:

```text
l1 = 9 → 9 → 9
l2 = 1
```

The calculation becomes:

```text
9 + 1 + 0 = 10 → 0, carry 1
9 + 0 + 1 = 10 → 0, carry 1
9 + 0 + 1 = 10 → 0, carry 1
0 + 0 + 1 = 1  → 1
```

Result:

```text
0 → 0 → 0 → 1
```

### Final Carry

The loop condition is:

```ts
while (l1 || l2 || remaining > 0)
```

The `remaining > 0` portion ensures that a carry remaining after both lists have been exhausted is still added to the result.

For example:

```text
9 + 1 = 10
```

produces:

```text
0 → 1
```

rather than incorrectly stopping after creating the `0`.

## Architecture & Design

The solution uses a simple iterative linked-list construction.

### Components

**Input nodes**

* `l1` points to the current node of the first number.
* `l2` points to the current node of the second number.

**Result list**

* `listNode` is the initial node used to construct the result.
* `currentListNode` tracks the current node in the result.

**Carry**

* `remaining` stores the carry generated by the previous digit calculation.

The result is constructed using:

```ts
currentListNode.next = new ListNode(val % 10);
currentListNode = currentListNode.next;
```

The initial node is not part of the returned result:

```ts
return listNode.next;
```

## API / Interface Changes

```ts
export function addTwoNumbers(
	l1: ListNode | null,
	l2: ListNode | null
): ListNode | null;
```

The function accepts two nullable `ListNode` references and returns the resulting linked list.

## Testing & Validation

Tests use Node's built-in test runner:

```bash
node --experimental-strip-types --test index.test.ts
```

### Case 1: Basic Addition

```ts
const l1 = [2, 4, 3];
const l2 = [5, 6, 4];
const expected = [7, 0, 8];
```

This represents:

```text
342 + 465 = 807
```

### Case 2: Zero

```ts
const l1 = [0];
const l2 = [0];
const expected = [0];
```

This validates the simplest valid input.

### Case 3: Different Lengths

```ts
const l1 = [9, 9, 9, 9, 9, 9, 9];
const l2 = [9, 9, 9, 9];
const expected = [8, 9, 9, 9, 0, 0, 0, 1];
```

This validates:

* Different input lengths.
* Missing digits being treated as `0`.
* Carry propagation.
* A final carry requiring an additional node.

## Complexity

For lists with lengths `n` and `m`:

* **Time:** O(max(n, m))
* **Space:** O(max(n, m))

Each node is processed once, and the result contains at most `max(n, m) + 1` nodes.

The algorithm uses constant additional state for the traversal pointers and carry.

## Alternatives Considered

### Alternative 1: Brute-Force Number Conversion

Convert both linked lists into JavaScript numbers, perform the addition, and convert the result back into a linked list.

| Pros                      | Cons                                   |
| ------------------------- | -------------------------------------- |
| Simple arithmetic         | Loses the linked-list representation   |
| Easy to implement         | Limited by JavaScript number precision |
| Less pointer manipulation | Requires additional conversions        |

**Why rejected:** The approach does not work reliably for arbitrarily large numbers because JavaScript `Number` has limited integer precision.

### Alternative 2: Normalize the List Lengths

Traverse both lists first and make their lengths equal before performing the addition.

| Pros                             | Cons                                     |
| -------------------------------- | ---------------------------------------- |
| Both lists have matching lengths | Requires additional traversal            |
| Simplifies some implementations  | Requires additional nodes or bookkeeping |
| Straightforward arithmetic       | Unnecessary additional work              |

**Why rejected:** A missing digit can simply be treated as `0` during the main traversal.

### Alternative 3: Recursive Traversal

Use recursion to process the linked lists and propagate the carry.

| Pros                                   | Cons                                     |
| -------------------------------------- | ---------------------------------------- |
| Natural representation of linked lists | Uses call stack space                    |
| Can produce concise code               | Potential stack overflow for large lists |
| Carry can be propagated recursively    | More complex control flow                |

**Why rejected:** The iterative implementation provides a straightforward linear traversal without relying on the call stack.

## Future Considerations

* Add tests for `null` inputs if the public API needs to support them explicitly.
* Add tests for very large linked lists.
* Add property-based tests using `BigInt` as a reference implementation.
* Extend the algorithm to support numbers stored in forward order.
* Generalize the implementation to support bases other than decimal.

## References

* [LeetCode 2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers)
