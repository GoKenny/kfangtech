package File;

import java.io.IOException;
import java.io.RandomAccessFile;

public class RandomAccesFileApp {

	public static void main(String[] args) throws IOException {

		String names[] = new String[10];
		long pointerNumber;

		RandomAccessFile raf = new RandomAccessFile("src/main/resources/TestingFiles/Names", "rw");
		
		System.out.println("----------------Before-------------------- ");
		
		// Each Line Should Have The Same Length
		for (int i = 0; i < names.length; i++)
			names[i] = "******";

		// 1. Save Lines To The File
		for (int i = 0; i < names.length; i++)
			raf.writeUTF(names[i]);

		// 2. Show What's In The File Now, Move Pointer Back First
		raf.seek(0);
		while ((pointerNumber = raf.getFilePointer()) < raf.length())
			System.out.println(pointerNumber + " " + raf.readUTF());

		
		System.out.println("\n----------------After-------------------- ");

		/** Write To Specific Line */
		// 1.Calculate pointerNumber
		int lineSize = names[0].length();
		int lineNumber = 4;                                // Line That You Want To Read
		pointerNumber = (lineSize + 2) * lineNumber;       // Pointer Number Algorithm, Compensate The Length of 2 of "\n" Maybe.

		// 2. Seek To The Pointer Numbr
		raf.seek(pointerNumber);
		raf.writeUTF("Kuinai");
		raf.writeUTF("Kuinai");

		raf.seek(0);
		while ((pointerNumber = raf.getFilePointer()) < raf.length())
			System.out.println(pointerNumber + " " + raf.readUTF());
		
		raf.close();

	}

}
