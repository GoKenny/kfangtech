package File;

import java.io.File;

public class CreateFolder {

	public static void main(String[] args) {

		File file = new File("/home/kfang/Desktop/Something Something");

		file.mkdir();
		System.out.println("Directory = " + file.getAbsolutePath());
	}
}
