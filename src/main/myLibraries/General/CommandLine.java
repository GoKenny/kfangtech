package General;

import java.io.IOException;

public class CommandLine {

	public static void main(String[] args) throws IOException,InterruptedException {

		Process p = Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler C:\\Users\\Kuinai\\Desktop\\Memo.docx");
		p.waitFor();
		
		Runtime.getRuntime().exec("notepad D:\\Java EE Labs\\KfangLab\\src\\main\\resources\\TestingFiles\\Something.csv");
		Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler D:\\Java EE Labs\\KfangLab\\src\\main\\resources\\TestingFiles\\Something.csv");
		
	}
}
