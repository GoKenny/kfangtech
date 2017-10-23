package util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

/** It is used to replace the double quote with single quote */
public class CleanHTML {

	public static void main(String[] args) throws IOException,InterruptedException {
		
		String inputFilePath = "src/main/resources/TestingFiles/About.html";

		// 1. Get the HTML file
		File file = new File(inputFilePath);
		BufferedReader read = new BufferedReader(new FileReader(file));

		String line;
		while ((line = read.readLine()) != null) {
			
			// 2. Replace " with ' for each line
			line = line.replace("\"", "'");
			System.out.println(line);
		}

		read.close();
	}
}
