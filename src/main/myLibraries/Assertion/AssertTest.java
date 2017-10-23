package Assertion;

public class AssertTest {

	public static void main(String[] args) {
		
		String name = "";
//		name = "kfang";
		assert (name != "") : "the name could not be empty!";

		System.out.println("the name is: " + name);
		
	}

}
