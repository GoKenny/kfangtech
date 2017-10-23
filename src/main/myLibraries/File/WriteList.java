package File;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

// JDK 7
public class WriteList {

    public static void main(String[] args) {
    	
        Path file = Paths.get("src/main/resources/TestingFiles/WriteList");

        List<String> lines = new ArrayList<String>();
        lines.add("Testing Testing");
        lines.add("is my name? ");
        lines.add("kuinai");
        lines.add("something something");
        lines.add("can wirte an article here");

        try {
     
            // Write lines of text to a file.
            Files.write(file, lines, StandardCharsets.UTF_8);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        System.out.println("Done.");
    }
	
}
