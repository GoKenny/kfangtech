package File;

import java.io.IOException;
import java.io.RandomAccessFile;

public class RandomAccessFile_WriteUTF {

	public static void main(String[] args) throws IOException {

		RandomAccessFile raf = new RandomAccessFile("src/main/resources/TestingFiles/UTF-RAF", "rw");

		// Each Line Must Has The Same Length
		raf.writeUTF("11111");
		raf.writeUTF("22222");
		raf.writeUTF("33333");
		raf.writeUTF("44444");
		raf.writeUTF("55555");

		// 1.Calculate pointerNumber
		int lineSize = 5 + 2;   // Actual Size Include "\n", it counts 2
		int lineNumber = 3 - 1; // Eclipse Marks 1st Line 1 Instead of 0.
		long pointerNumber = lineSize * lineNumber;

		// 2. Write To Exact Location
		raf.seek(pointerNumber);
		raf.writeUTF("Kenny");

		raf.close();

	}

}
