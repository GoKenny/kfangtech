package String;

public class Replace {

	public static void main(String[] args) {

		String string = "what '''' ((( ) ___ \\  &&& ";

		string = string.replace("what", "0");
		string = string.replace("'", "1");
		string = string.replace("'", "2");
		string = string.replace("(", "3");
		string = string.replace(")", "4");
		string = string.replace("_", "5");
		string = string.replace("\\", "6");
		string = string.replace("&", "7");

		string = string.replace("\"", "\\\"").replace("\n", "").replace("\r", "");
		
		System.out.println(string);

	}

}
