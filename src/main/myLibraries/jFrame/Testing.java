package jFrame;
import java.util.Scanner;

public class Testing {

	public static void main(String[] args) {

		String ages[] = new String[12];
		for (int i = 0; i < ages.length; i++) {
			// 0. get from user
			Scanner scanner = new Scanner(System.in);
			String input = scanner.nextLine();

			// 1. replace the key words with numbers
			input = input.replace("years", "");
			input = input.replace("and a half", ".5");

			// 2. remove the spaces by splinting the word and reassemble it.
			String newInput[] = input.split(" ");
			ages[i] = newInput[0] + newInput[1];
			System.out.println(newInput[0] + newInput[1]);
		}
		
		
		

	}

}
