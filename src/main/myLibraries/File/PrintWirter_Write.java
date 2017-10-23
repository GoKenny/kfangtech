package File;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class PrintWirter_Write {

	public static void main(String[] args) throws IOException {

		// true -> write to the end of file
		PrintWriter printWriter = new PrintWriter(new BufferedWriter(new FileWriter("src/main/resources/something.txt", true)));
		
		for (int i = 0; i < 500; i++) 
			printWriter.write("0.5"+"\t"+"55664\n");
		
		printWriter.close();
		
		System.out.println("Done");

	}

}
