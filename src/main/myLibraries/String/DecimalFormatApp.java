package String;

import java.text.DecimalFormat;
import java.text.NumberFormat;

public class DecimalFormatApp {
	public static void main(String[] args) {

		int intNumb = 12345678;
		double doubleNumb = 12.34;
		double percent = 0.56;

		/*** Decimal Format */
		DecimalFormat decimalFormat = new DecimalFormat("Something 0.00%");
		System.out.println(decimalFormat.format(intNumb));
		System.out.println(decimalFormat.format(doubleNumb));
		System.out.println(decimalFormat.format(percent));

		/** Currency */
		NumberFormat numberFormat = NumberFormat.getCurrencyInstance();
		// numberFormat = new DecimalFormat("#0.00");
		System.out.println(numberFormat.format(intNumb));

	}

}
