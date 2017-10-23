package File;

import java.io.IOException;
import java.io.RandomAccessFile;

public class ReadAndWrite {

	public static void main(String[] args) throws IOException {

		String information;
		
		RandomAccessFile raf = new RandomAccessFile("src/main/resources/TestingFiles/PlainRAF", "rws");

		System.out.println("\n---------Before-----------\n");
		raf.seek(0);
		while ((information = raf.readLine()) != null)
			System.out.println(information);
		
		
		System.out.println("\n--------- Update-----------\n");
		raf.seek(0);
		while ((information = raf.readLine()) != null)
			if(information.equals("Kenny")){
				// 1. Return One Line
				raf.seek(raf.getFilePointer() - information.length() - 1);
				// 2. Wirite To Next Line
				raf.writeBytes("33333");
			}
		
		System.out.println("\n--------- After-----------\n");
		raf.seek(0);
		while ((information = raf.readLine()) != null)
			System.out.println(information);
		
		raf.close();

	}

}
