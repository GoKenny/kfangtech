package File;

import java.io.IOException;
import java.nio.file.CopyOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class CopyFile_JDK7 {

	public static void main(String[] args) {

		// Can Rename The File or Suffix
		Path from = Paths.get("/home/kfang/Desktop/something");
		Path to = Paths.get("/home/kfang/Desktop/Testing/anotherthing.csv");

		// Define the options used in the file copy process.
		CopyOption[] options = new CopyOption[] {StandardCopyOption.REPLACE_EXISTING,StandardCopyOption.COPY_ATTRIBUTES };

		try {

			Files.copy(from, to, options);

		} catch (IOException e) {
			e.printStackTrace();
		}

		System.out.println("Done");

	}

}
