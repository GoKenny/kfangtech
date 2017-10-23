package TCP_NetCentricComputing;

/**Author: Kuinai Fang*/

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.InputStreamReader;
import java.net.Socket;
import java.util.Scanner;

class TCPClient {

	public static void main(String argv[]) throws Exception {
		String sentence;
		String modifiedSentence;
		/** The total number of data in the file */
		int numberCount = 0;
		/** The start time of this session */
		long startTime = System.currentTimeMillis();
		/** Indication of the current status of reading the file */
		boolean hasNext = true;

		Socket clientSocket = new Socket("localhost", 6789);
		DataOutputStream outToServer = new DataOutputStream(clientSocket.getOutputStream());
		BufferedReader inFromServer = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));

		/** Load the file, it's on my desktop */
		Scanner scan = new Scanner(new File("C://Users//Kuinai//Desktop//PoemShakespear.txt"));

		/**
		 * Read the content from the file, and send the contents to the server,
		 * then received the modified contents from the server
		 */
		while (hasNext) {

			// Get 1 line from the file
			sentence = scan.nextLine();

			numberCount += sentence.length() - 1;

			// Send this line to the server
			outToServer.writeBytes(sentence + '\n');

			// Receive the modified string from server
			modifiedSentence = inFromServer.readLine();

			// Print out the modified string from server
			System.out.println("FROM SERVER: " + modifiedSentence);

			// Check if the file still has next line
			hasNext = scan.hasNext();

			if (!hasNext) {
				outToServer.writeBytes("Done\n");
				System.out.println(inFromServer.readLine() + " Bye");
			}
		}

		System.out.println("\nThe total numbers of charactets seent:  " + numberCount);
		System.out.println("Total Time Spent: " + (System.currentTimeMillis() - startTime) + "milliseconds");

		/** Clean the memory after this process */
		clientSocket.close();
		outToServer.close();
		inFromServer.close();
	}
}
