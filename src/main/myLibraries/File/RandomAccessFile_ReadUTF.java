package File;

import java.io.IOException;
import java.io.RandomAccessFile;

public class RandomAccessFile_ReadUTF {

	public static void main(String[] args) throws IOException {

		RandomAccessFile raf = new RandomAccessFile("src/main/resources/TestingFiles/UTF-RAF", "rw");

		long pointerNumber;

		raf.seek(0);
		while ((pointerNumber = raf.getFilePointer()) < raf.length())
			System.out.println(pointerNumber + " " + raf.readUTF());

	}

}
