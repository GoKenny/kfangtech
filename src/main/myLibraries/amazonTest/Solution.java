package amazonTest;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

public class Solution {

	public static void main(String args[]) throws Exception {

		File file = new File("src/main/resources/input000.txt");
		BufferedReader read = new BufferedReader(new FileReader(file));

		Solution solution = new Solution();
		String information;
		String roman;
		int number=0;
		
		while ((information = read.readLine()) != null) {

			try {
				number = Integer.parseInt(information);
				
				if (number == 0 || number >= 4000) {
					System.out.println("NARN");
					continue;
				}
			} catch (NumberFormatException e) {
				System.out.println("NARN");
				continue;
			}

			roman = solution.getRoman(number);
			System.out.println(roman);
		}

		read.close();

	}

	public String getRoman(int number) {

		String roman[] = { "M", "XM", "CM", "D", "XD", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I" };
		int correspondingNumb[] = { 1000, 990, 900, 500, 490, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 };

		String result = "";

		int i = 0;
		while (number > 0 || correspondingNumb.length == (i - 1)) {

			while ((number - correspondingNumb[i]) >= 0) {
				
				number -= correspondingNumb[i];
				result += roman[i];
					
			}
			i++;
		}

		return result;
	}

}
