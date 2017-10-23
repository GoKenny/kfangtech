package General;

import java.util.Scanner;

public class ReadFromKeyBoard {
	public static void main(String[] args) {

		String input;

		Scanner scan = new Scanner(System.in);
		input = scan.next();// input with space
		input = scan.nextLine();
		scan.nextInt();
		scan.nextLong();
		/*
		 * scan.nextInt();
		 */

		switch (0) {
		case 0:
			System.out.println("Bye!");
			break;

		case 1:
			System.out.println("Enter integer to add to front");

		default:
			System.out.println("Sorry, invalid choice");
		}
		
		System.out.println(input);
	}

}
