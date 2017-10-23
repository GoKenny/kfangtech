package HttpRequest;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.util.Scanner;

/**
 * Requirements
 * 
 * 1. create URL based on user input
 * 
 * 2. make HTTP request to corresponding server
 * 
 * 3. display HTTP response
 * 
 * 4. save HTML source file from server with the name of "info3103a1a.html"
 * 
 * 5. also test non-existing web pages
 * */

/**
 * @author Kuinai Fang - 3408394
 */
public class info3103a1a {

	public String askUserInput() {
		String protocal;
		String domain;
		String port;
		String path;

		Scanner scan = new Scanner(System.in);

		System.out.println("\nPlease input the followings:\n");

		System.out.println("(optional, default http) protocol: ");
		protocal = scan.nextLine();
		if (protocal.trim().equals(""))
			protocal = "http";
		// Clean User Input
		protocal = protocal.replace(":", "");
		protocal = protocal.replace("/", "");

		System.out.println("*domain: ");
		domain = scan.nextLine();

		System.out.println("(optional, defult 80) port: ");
		port = scan.nextLine();
		port = port.replace(":", ""); // Clean User Input
		if (port.equals(""))
			port = "80";

		System.out.println("(optional) path: ");
		path = scan.nextLine();

		return protocal + "://" + domain + ":" + port + "/" + path;
	}

	public void fancyRequest(String url) throws InterruptedException {

		System.out.println("\nGoing to " + url);
		System.out.print("\nin ");
		for (int i = 5; i > 0; i--) {
			System.out.print(i + " ");
			Thread.sleep(1000);
		}
		System.out.println("\n=============Here We Go==============\n\n");
		Thread.sleep(1000);

	}

	public String goToServer(String url) throws IOException {

		URL userURL = new URL(url);
		BufferedReader bufferReader = new BufferedReader(new InputStreamReader(userURL.openStream()));

		String data = "";
		String htmlData = "";
		while ((data = bufferReader.readLine()) != null)
			htmlData += data + "\n";

		bufferReader.close();

		return htmlData;
	}

	public String saveToFile(String htmlData) throws IOException {

		String fileName = "/info3103a1a.html";

		System.out.println("\n\n");
		System.out.println("************************************************************************************");
		System.out.println("(optional, default on your Desktop) Where do you what to save the data to ? ");
		System.out.println("path of directory: ");
		System.out.println("************************************************************************************");

		Scanner scan = new Scanner(System.in);

		String filePath = scan.nextLine();
		if (filePath.trim().equals(""))
			filePath = System.getProperty("user.home") + "/Desktop/";

		PrintWriter printWriter = new PrintWriter(new BufferedWriter(new FileWriter(filePath + fileName)));
		printWriter.write(htmlData);
		printWriter.close();

		File file = new File(filePath + fileName);
		System.out.println("\nDone, file is saved to " + file);

		return file.toString();
	}

	public void openHTML(String fileLocation) {

		try {
			System.out.println("\n(Work only on 32-bit Windows OS) \nOpening the HTML file of " + fileLocation);
			System.out.print("\nin ");
			for (int i = 10; i > 0; i--) {
				System.out.print(i + " ");
				Thread.sleep(1000);
			}
			Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler " + fileLocation);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public static void main(String[] args) throws Exception {

		info3103a1a info3103a1a = new info3103a1a();

		// 1. Ask for user input
		String url = info3103a1a.askUserInput();

		// optional
		info3103a1a.fancyRequest(url);

		// 2. Go to the server and get the HTML
		String htmlData = info3103a1a.goToServer(url);

		// 3. Print out the HTML data
		System.out.println(htmlData);

		// 4. Save it to a file
		String fileLocation = info3103a1a.saveToFile(htmlData);

		// optional
		info3103a1a.openHTML(fileLocation);

	}

}
