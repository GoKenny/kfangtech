package String;

import java.util.StringTokenizer;

public class Tokenizer {
	
	public static void main(String[] args) {
		
		// Split by space
		StringTokenizer tokenizer = new StringTokenizer("My Name is Kuinai Fang");
		
		while (tokenizer.hasMoreTokens()) {
			System.out.println(tokenizer.nextToken());
		}
	}

}
