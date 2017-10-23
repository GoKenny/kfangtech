package Exception;

import java.util.Scanner;

public class ExceptionApp {
	
	@SuppressWarnings("resource")
	public static void main(String[] args) {

		Scanner scan = new Scanner(System.in);
		SomeExceptions	someException = new SomeExceptions();

		String keepGoing = "y";

		while (keepGoing.equals("y") || keepGoing.equals("Y")) {
			
			try {

				// If exceptin occurs here, loop front
				System.out.print("Enter an integer that is 0<n<17: ");
				int val = scan.nextInt();
				someException.factorial(val);

				System.out.print("Another factorial? (y/n) ");
				keepGoing = scan.next();

			} catch (IllegalArgumentException e) {
				
				System.out.print(e + "\n");
				
				System.out.println("or just do nothing");
			}
			
		}

		// Catch Everything and Do Something
		try {
			
			System.out.print("Input Non Integer to Cause Exception:");
			scan.nextInt();
			System.out.println("You Should Enter Something to Cause Exceptioin");

		} catch (Exception e) {
			
			System.out.println(e);
			System.out.println(("Something"));
			System.out.println(("Gonna Stop This Program"));
			System.exit(0);
			
		}
		
	}
	
}
