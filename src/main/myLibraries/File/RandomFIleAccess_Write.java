package File;

import java.io.IOException;
import java.io.RandomAccessFile;

public class RandomFIleAccess_Write {

	public static void main(String[] args) throws IOException {

		RandomAccessFile raf = new RandomAccessFile("src/main/resources/TestingFiles/PlainRAF", "rw");

		// Each Line Must Has The Same Length
		raf.writeBytes("11111\n");
		raf.writeBytes("22222\n");
		raf.writeBytes("33333\n");
		raf.writeBytes("44444\n");
		raf.writeBytes("55555\n");
		
		// 1.Calculate pointerNumber
		int lineSize = 5 + 1 ;                              // Actual Size Include "\n", it counts 1
		int lineNumber = 3 - 1;                             // Eclipse Marks 1st Line 1 Instead of 0.
		long pointerNumber = lineSize  * lineNumber;      
		
		// 2. Write To Exact Location
		raf.seek(pointerNumber);
		raf.writeBytes("Kenny\n");
		
		raf.close();

		System.out.println("Done.");
		
	}
}
