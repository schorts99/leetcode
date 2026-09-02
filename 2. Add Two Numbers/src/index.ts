export class ListNode {
	val: number;
	next: ListNode | null;

	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}

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
