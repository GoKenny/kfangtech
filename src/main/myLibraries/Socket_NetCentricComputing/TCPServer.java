package Socket_NetCentricComputing;

/* TCPServer.java from Kurose-Ross */

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

class TCPServer {
	
	public static void main(String argv[]) throws Exception {
		
		String clientSentence = null;
		String capitalizedSentence;
		String tempMessage;

		ServerSocket welcomeSocket = new ServerSocket(6789);
		System.out.println("Waiting for connection.....");

		while (true) {
			
			Socket connectionSocket = welcomeSocket.accept();
			System.out.println("Connection successful");
			System.out.println("Waiting for input.....");

			BufferedReader inFromClient = new BufferedReader(new InputStreamReader(connectionSocket.getInputStream()));
			DataOutputStream outToClient = new DataOutputStream(connectionSocket.getOutputStream());

			// 1. Load the messge from client to one String
			tempMessage = inFromClient.readLine();
			System.out.println(tempMessage);
			while (!tempMessage.equals(null)) {
				clientSentence += tempMessage;
				tempMessage = inFromClient.readLine();
			}

			// 2. Convert the String to upper case
			System.out.println("From client: " + clientSentence);
			capitalizedSentence = clientSentence.toUpperCase() + '\n';
			
			// 3. Send Back To Client
			outToClient.writeBytes(capitalizedSentence);

			// 4. Close ServerSocket
			welcomeSocket.close();

			// System.exit(0);

		}
	}
}
