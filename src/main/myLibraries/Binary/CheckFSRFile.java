package Binary;

import java.io.IOException;
import java.io.RandomAccessFile;

import org.apache.commons.codec.binary.Base64;

public class CheckFSRFile {

	public static void main(String[] args) throws IOException {

		RandomAccessFile raf = new RandomAccessFile("src/main/resources/TestingFiles/BB10_fsrFreeResults.dat", "rw");

		String information;
		byte[] base64Bytes;
		byte[] base8Bytes;
	
		raf.seek(0);
		while ((information = raf.readLine()) != null) {

			base64Bytes = information.getBytes();
			base8Bytes = Base64.decodeBase64(base64Bytes);
			
			// Get rid of those "0"s.
			int[] number = new int[base8Bytes.length/4];
			for (int i = 3, j = 0; i < base8Bytes.length; i=i+4,j++) 
				number[j] = base8Bytes[i];
			
			for (int i = 0; i < number.length; i++) 
				System.out.print(number[i]+",");
			
			System.out.println();

		}

		raf.close();

	}

}
