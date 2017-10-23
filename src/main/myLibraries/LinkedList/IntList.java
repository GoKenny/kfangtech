package LinkedList;

public class IntList {
	
	// first node in list
	private IntNode front;

	public IntList() {
		front = null;
	}

	// font: 4,3,2,1,null
	public void addToFront(int val) {
		this.front = new IntNode(val, front);
	}

	// front 1,2,3,4,null
	public void addToEnd(int val) {
		IntNode newnode = new IntNode(val, null);

		if (front == null)
			front = newnode;
		else {
			
			// 1. make temp pointer so that won't change the current front
			IntNode temp = front;

			// 2. seek to the end of the list
			while (temp.next != null)
				temp = temp.next;

			// 3. Add the node to the end
			temp.next = newnode;
		}
	}

	public void removeFirst() {
		if (front != null)
			front = front.next;
	}

	public void removeLast() {
		if (front != null) {
			IntNode temp = front;
			while (temp.next.next != null)
				temp = temp.next;

			temp.next = null;
		}
	}

	// replace all occurrences of
	public void replace(int oldVal, int newVal) {
		IntNode temp = front;
		while (temp != null) {
			if (temp.val == oldVal)
				temp.val = newVal;
			temp = temp.next;
		}
	}

	// get the length of the list
	public int length() {
		int count = 1;
		IntNode temp = front;
		while (temp.next != null) {
			count++;
			temp = temp.next;
		}
		return count;
	}

	// print list in order
	public void inOrder(IntNode temp) {
		if (temp == null)
			return;

		else {
			System.out.print(temp.val + " ");
			inOrder(temp.next);
		}
	}

	// print list backwards
	public void backwards(IntNode temp) {
		if (temp == null)
			return;
		else {
			backwards(temp.next);
			System.out.print(temp.val + " ");
		}
	}

	// call the method to print in order
	public void print() {
		System.out.println("--------------------");
		System.out.print("List elements: ");
		IntNode temp = front;

		while (temp != null) {
			System.out.print(temp.val + " ");
			temp = temp.next;
		}

		System.out.println("\n-----------------------\n");
	}

	public void printRec() {
		inOrder(front);
	}

	// call the method to print backwards
	public void printRecBackwards() {
		backwards(front);
	}

	// toString method
	public String toString() {
		String info = "\n";
		IntNode temp = front;
		while (temp != null) {
			info += temp.val + " ";
			temp = temp.next;
		}
		return info;
	}

	// private class IntNode {
	// public int val; // value stored in node
	// public IntNode next; // link to next node in list
	//
	// public IntNode(int val, IntNode next) {
	// this.val = val;
	// this.next = next;
	// }
	// }
}
