package String;

public class Format {

	public static void main(String[] args) {

		String myData = "Kenny";
		int myNumber = 123;

		myData = String.format("{ %s : %d }", myData, myNumber);

		System.out.println(myData);

	}

}
