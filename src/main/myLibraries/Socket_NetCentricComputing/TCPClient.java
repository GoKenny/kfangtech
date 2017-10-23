package Socket_NetCentricComputing;

/* TCPClient.java from Kurose-Ross */

import java.io.*;
import java.net.*;
import java.util.Scanner;

@SuppressWarnings("unused")
class TCPClient {
	public static void main(String argv[]) throws Exception {
		String sentence = "\n";
		String modifiedSentence;

		BufferedReader inFromUser = new BufferedReader(new InputStreamReader(System.in));

		// 1. Creating instances that to receive message from user, then send to Server
		Socket clientSocket = new Socket("localhost", 6789);
		DataOutputStream dataOutputStream = new DataOutputStream(clientSocket.getOutputStream());
		BufferedReader bufferReader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

		// 2. Get the massage form the file
		Scanner scan = new Scanner(new File("C://Users//Kuinai//Desktop//PoemShakespear.txt"));
		while (scan.hasNextLine()) {
			sentence += scan.nextLine() + "\n";
		}

		// Check the content
		System.out.print("Here is the conten of this file ");
		System.out.println(sentence);

		// 3. Send this poem to server
		dataOutputStream.writeBytes(sentence);

		// 4. Receive the modified sentence from the server
		modifiedSentence = bufferReader.readLine();

		System.out.println("FROM SERVER: " + modifiedSentence);

		// 5. Close the Socket and Scanner
		clientSocket.close();
		scan.close();
	}
}
