package File;

import java.io.File;

public class GetAllFileNames {

	public static void main(String[] args) {

		File folder = new File("src/main/resources");

		String fileNames[] = folder.list();

		for (String fileName : fileNames)
			System.out.println(fileName);

	}

}
