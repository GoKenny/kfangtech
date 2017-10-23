package String;

public class CharNumber {

	public static void main(String[] args) {

		String word = "abcd";

		// 1. Get the first letter and get its charNumb;
		char character = word.toCharArray()[0];
		int charNumb = character;

		// a=97 A=65 z=122 Z=90
		System.out.println(charNumb);

	}

}
