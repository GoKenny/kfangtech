package String;
public class PasswordRules {

	public static void main(String[] args) {

		String illegalPassword = "#91234";
		String weakPassword = "abcdefghijk";
		String fairPassword = "ABC123defghijk";
		String StrongPassword = "ABC123defghijk++";

		// Test The function
		PasswordRules password = new PasswordRules();
		System.out.println(password.checkPassword(illegalPassword));
		System.out.println(password.checkPassword(weakPassword));
		System.out.println(password.checkPassword(fairPassword));
		System.out.println(password.checkPassword(StrongPassword));

	}

	public String checkPassword(String password) {

		String passwordStrength = "illegal";
		boolean hasLowerCase = false;
		boolean hasUpperCase = false;
		boolean hasNumber = false;
		boolean hasSymbol = false;

		// must contain 8 characters
		if (password.length() < 8)
			return passwordStrength;

		for (int i = 0; i < password.length(); i++) {
			int charNumb = password.toCharArray()[i];

			// check if has number
			if (charNumb >= 48 && charNumb <= 57)
				hasNumber = true;
			// check if has upper case
			else if (charNumb >= 65 && charNumb <= 90)
				hasUpperCase = true;
			// check if has lower case
			else if (charNumb >= 97 && charNumb <= 122)
				hasLowerCase = true;
			else
				hasSymbol = true;
		}

		if ((hasLowerCase || hasUpperCase) && !hasSymbol && !hasNumber)
			return "weak";

		if (hasUpperCase && hasNumber && !hasSymbol)
			return "fair";

		if (hasUpperCase && hasNumber && hasSymbol)
			return "strong";

		return passwordStrength;

	}

}
