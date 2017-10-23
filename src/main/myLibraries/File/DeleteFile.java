package File;

import java.io.File;

public class DeleteFile {

	public static void main(String[] args) {

		File file = new File("/home/kuinai/Desktop/testing");

		if (file.exists()) {
			System.out.println("Deleting file " + file.getAbsolutePath());
			file.delete();
		}
	}

}
