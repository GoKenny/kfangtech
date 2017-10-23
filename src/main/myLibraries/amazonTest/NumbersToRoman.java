package amazonTest;

public class NumbersToRoman {

	public static void main(String[] args) {

		NumbersToRoman numbersToRoman = new NumbersToRoman();

		System.out.println(numbersToRoman.getRoman(4));

	}

	public String getRoman(int number) {

		String riman[] = { "M", "XM", "CM", "D", "XD", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I" };
		int arab[] = { 1000, 990, 900, 500, 490, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 };

		String theResult = "";

		int i = 0;
		while (number > 0 || arab.length == (i - 1)) {

			while ((number - arab[i]) >= 0) {
				number -= arab[i];
				theResult += riman[i];
			}
			i++;
		}

		return theResult;
	}
}
