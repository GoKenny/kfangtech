package File;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.FileTime;

public class LastModifiedTime {

	public static void main(String[] args) throws Exception {
		
		String path = "src/main/resources/TestingFiles/Something";
		Path file = Paths.get(path);

		BasicFileAttributes attr = Files.readAttributes(file,BasicFileAttributes.class);
		System.out.println("lastModifiedTime() = " + attr.lastModifiedTime());

		// Update the last modified time of the file.
		long currentTimeMillis = System.currentTimeMillis();
		System.out.println(currentTimeMillis);
		FileTime fileTime = FileTime.fromMillis(1353637216066l);
		Files.setLastModifiedTime(file, fileTime);

		attr = Files.readAttributes(file, BasicFileAttributes.class);
		System.out.println("lastModifiedTime() = " + attr.lastModifiedTime());
	}

}
