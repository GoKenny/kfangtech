package String;

public class SubString {

	public static void main(String[] args) {
		String s = "unb";

		// length
		System.out.println(s.length());

		// substring
		System.out.println(s.substring(0, 2));

		// last letter
		System.out.println(s.substring(s.length() - 1, s.length()));
		
		// Delete Last letter;
		s=s.substring(0,s.length()-1);
		System.out.println(s);

	}

}
