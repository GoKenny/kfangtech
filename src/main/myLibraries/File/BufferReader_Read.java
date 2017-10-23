package File;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

// File could be folder or actual file, also see "GetAllFileNames"
// Relative Path For Development, or Use Absolute Path
// When Packaged To A Jar,It's In The First Layer. So Write "Something" To Locate It In Jar

public class BufferReader_Read {

	public static void main(String[] args) throws IOException,InterruptedException {

		/** Buffer Reader Read */
		File file = new File("src/main/resources/TestingFiles/Something");
		BufferedReader bufferedReader = new BufferedReader(new FileReader(file));

		String information;
		while ((information = bufferedReader.readLine()) != null) {
			Thread.sleep(500);
			System.out.println(information);
		}

		bufferedReader.close();
		
	}

}

/** Check If File Exists */
// if (file.exists())
// System.out.println("File Location:" + file + "\n");
// else
// System.err.println("This file does not exist");

/** Scanner Read */
// Scanner scan = new Scanner(new
// File("/home/kfang/Desktop/Something"));
//
// while (scan.hasNextLine()) {
// String input = scan.nextLine();
// System.out.println(input);
// }
//
// scan.close();