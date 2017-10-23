package File;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class WriteExel {

	public static void main(String[] args) throws IOException {
		
		// 1. Put "csv" Suffix
		PrintWriter pw = new PrintWriter(new BufferedWriter(new FileWriter("src/main/resources/Something.csv")));

		for (int i = 0; i < 500; i++)
			// 2. Use "," As Formate.
			pw.write("What" + "," + "Something\n");

		pw.close();
		System.out.println("Done");
		
	}

}
