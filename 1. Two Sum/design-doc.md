# 1. Two Sum

Author(s): [Jorge Castillo](https://github.com/schorts99)
Status: Completed
Last Updated: Aug 05, 2026

## Table of Contents

- [Summary](#summary)
- [Goals](#goals)
- [Non-Goals](#non-goals)
- [Context](#context)
- [Proposed Solution](#proposed-solution)
- [Architecture & Design](#architecture-&-design)
- [API / Interface Changes](#api-/-interface-changes)
- [Testing & Validation](#testing-&-validation)
- [Alternatives Considered](#alternatives-considered)
- [Future Considerations](#future-considerations)
- [References](#references)

## Summary

This document describes an efficient single-pass solution to the classic Two Sum problem: given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. The implementation uses a hash map to achieve O(n) time and O(n) space, making it suitable for interview settings and production use where linear performance is required.

## Goals

- Return the indices of any two distinct elements that sum to `target`.
- Achieve average-case O(n) time complexity.
- Use only a single pass over the input array.
- Keep the implementation simple, readable, and idiomatic JavaScript.

## Non-Goals

- Finding all pairs that sum to the target.
- Handling multiple valid answers beyond returning the first discovered pair.
- Supporting floating-point numbers or non-numeric inputs.
- Guaranteeing a specific order of indices beyond “earlier index first”.
- Optimizing for worst-case O(1) lookups under adversarial hash collisions.

## Context

The Two Sum problem is a fundamental coding-interview question and a common building block in more complex algorithms (e.g., 3Sum, 4Sum, subarray-sum problems). A naïve nested-loop approach is O(n²) and becomes impractical for large inputs. A hash-map-based single-pass solution is the accepted optimal approach under the usual constraints (array length up to ~10⁵, integer values within typical 32/64-bit ranges).

## Proposed Solution

Maintain a map from value → index while iterating once through the array. For each element `nums[i]`:

1. Compute the required complement: `target - nums[i]`.
2. If the complement already exists in the map, return the stored index together with the current index.
3. Otherwise store the current value and its index in the map and continue.

This guarantees that when a valid pair is found, the first index is always the earlier one.

```js
export function twoSum(nums, target) {
  const numMap = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (complement in numMap) {
      return [numMap[complement], i];
    }

    numMap[nums[i]] = i;
  }
}
```

## Architecture & Design

- **Core component:** a plain JavaScript object used as a hash map (`value → index`).
- **Single linear scan:** no nested loops, no sorting.
- **Early exit:** the function returns as soon as the first valid pair is discovered.
- **Assumption:** exactly one valid solution exists (or the first one found is acceptable). If no solution exists the function implicitly returns `undefined`.

No external dependencies or additional modules are required.

## API / Interface Changes

```ts
/**
 * Finds two indices whose values sum to the target.
 * @param nums - Array of integers
 * @param target - Target sum
 * @returns [index1, index2] or undefined if no solution
 */
export function twoSum(nums: number[], target: number): [number, number] | undefined;
```

## Testing & Validation

### Unit-test cases (minimum):

```
node --test src/index.test.js
```

### Edge cases & error handling

- Empty array or single-element array → `undefined`.
- Very large arrays (performance sanity check).
- Integer overflow is not a concern in modern JavaScript (`Number` is IEEE-754 double).

### Performance

- Time: O(n) average case.
- Space: O(n) for the map.
- No security concerns for this pure function.

## Alternatives Considered

### Alternative 1: Brute-force nested loops

| Pros             | Cons                      |
|------------------|---------------------------|
| Extremely simple | O(n²) time                |
| No extra space   | Unusable for large inputs |

**Why rejected:** Does not meet the performance goal.

### Alternative 2: Sort + two pointers

| Pros                           | Cons                                             |
|--------------------------------|--------------------------------------------------|
| O(n log n) time                | Loses original indices (needs extra bookkeeping) |
| O(1) extra space (if in-place) | More complex implementation                      |

**Why rejected:** Higher time complexity and more moving parts than the hash-map approach for the stated requirements.

## Future Considerations

- Extend to return all unique pairs (or all index pairs).
- Consider `Map` instead of a plain object for clearer semantics and better handling of non-string keys (though numbers work fine with objects).

## References

- [LeetCode 1. Two Sum](https://leetcode.com/problems/two-sum)

