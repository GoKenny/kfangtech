package String;

public class CheckType {

	public static boolean isInteger(String string) {

		try {
			Integer.parseInt(string);
		} catch (NumberFormatException e) {
			return false;
		}

		return true;
	}

	public static void main(String[] args) {

		String string = "123";

		if (isInteger(string))
			System.out.println("yes");
		else
			System.out.println("no");
	}
}
