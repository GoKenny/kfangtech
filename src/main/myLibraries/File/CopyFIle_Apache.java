package File;

// "commons-io-1.3.2.jar"
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;

public class CopyFIle_Apache {
	public static void main(String[] args) {

		File srcFile = new File("/home/kfang/Desktop/Something");
		File destDir = new File("/home/kfang/Desktop/Target Folder");

		try {
			FileUtils.copyFileToDirectory(srcFile, destDir);
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("done");
	}
}
