package File;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.DosFileAttributes;

public class FileAttributes {

	public static void main(String[] args) throws Exception {
		
		String path = "src/main/resources/Something";
		Path file = Paths.get(path);

		// Get current Dos file attributes and print it.
		DosFileAttributes attr = Files.readAttributes(file,DosFileAttributes.class);
		printAttributes(attr);

		// Set a new file attributes.
		Files.setAttribute(file, "dos:archive", false);
		Files.setAttribute(file, "dos:hidden", true);
		Files.setAttribute(file, "dos:readonly", true);
		Files.setAttribute(file, "dos:system", false);

		// Read the newly set file attributes and print it.
		attr = Files.readAttributes(file, DosFileAttributes.class);
		printAttributes(attr);
	}

	/**
	 * Print the DosFileAttributes information.
	 */
	private static void printAttributes(DosFileAttributes attr) {
		System.out.println("isArchive()  = " + attr.isArchive());
		System.out.println("isHidden()   = " + attr.isHidden());
		System.out.println("isReadOnly() = " + attr.isReadOnly());
		System.out.println("isSystem()   = " + attr.isSystem());
		System.out.println("----------------------------------------");
	}

}
