package LinkedList;

import java.util.Scanner;

public class IntListTest {
	private Scanner scan = new Scanner(System.in);
	private IntList list = new IntList();

	public void printMenu() {
		System.out.println("\n Menu ");
		System.out.println(" ====");
		System.out.println("0: Quit");
		System.out.println("1: Add an integer to the front of the list");
		System.out.println("2: Add an integer to the end of the list");
		System.out.println("3: Remove an integer from the front of the list");
		System.out.println("4: Print the list");
		System.out.println("5: Print the length of the list");
		System.out.println("6: Print the toString of the list");
		System.out.println("7: remove the last one of the list");
		System.out.println("8: repalce the elements of list");
		System.out.println("9: print in order in recursion");
		System.out.print("\nEnter your choice: ");
	}

	public void dispatch(int choice) {
		
		int newVal, oldVal;
		switch (choice) {
		case 0:
			System.out.println("Bye!");
			break;

		case 1: // add to front
			System.out.println("Enter integer to add to front");
			newVal = scan.nextInt();
			list.addToFront(newVal);
			break;

		case 2: // add to end
			System.out.println("Enter integer to add to end");
			newVal = scan.nextInt();
			list.addToEnd(newVal);
			break;

		case 3: // remove first element
			list.removeFirst();
			break;

		case 4: // print
			list.print();
			break;

		case 5: // print the length of the list
			System.out.print(list.length());
			break;

		case 6: // print the toString of the list
			System.out.print(list);
			break;

		case 7: // remove the last one of the list
			list.removeLast();
			break;

		case 8: // replace all occurrences of oldVal in the list with newVal
			System.out.println("Enter oldVal");
			oldVal = scan.nextInt();
			System.out.println("Enter newVal");
			newVal = scan.nextInt();
			list.replace(oldVal, newVal);
			break;

		case 9: // remove the last one of the list
			list.printRec();
			break;

		case 10:
			list.printRecBackwards();
			break;

		default:
			System.out.println("Sorry, invalid choice");
		}
	}

	public static void main(String[] args) {

		Scanner scan;
		IntListTest intListTest = new IntListTest();

		scan = new Scanner(System.in);
		intListTest.printMenu();
		int choice = scan.nextInt();

		while (choice != 0) {
			intListTest.dispatch(choice);
			intListTest.printMenu();
			choice = scan.nextInt();
		}
	}
	
}
