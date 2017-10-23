package File;

import java.io.File;
import java.io.IOException;

public class EmptyFileLengthApp {

	public static void main(String[] args) throws IOException,InterruptedException {

		File file = new File("src/main/resources/emptyFile");

		System.out.println(file.length());

	}

}
