package TCP_NetCentricComputing;

/**Author: Kuinai Fang*/

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;

class TCPServer {

	public static void main(String argv[]) throws Exception {
		String clientSentence = "Start\n";
		String capitalizedSentence = null;
		String bye = "Bye";

		ServerSocket welcomeSocket = new ServerSocket(6789);
		System.out.println("Waiting for connection.....");

		while (true) {
			Socket connectionSocket = welcomeSocket.accept();
			System.out.println("Connection successful");
			System.out.println("Waiting for input.....");

			BufferedReader inFromClient = new BufferedReader(new InputStreamReader(connectionSocket.getInputStream()));
			DataOutputStream outToClient = new DataOutputStream(connectionSocket.getOutputStream());

			/** Read the message from the client and send it back */
			while (clientSentence != "Done\n") {

				clientSentence = inFromClient.readLine();

				System.out.println("From client: " + clientSentence);

				if (clientSentence == null)
					break;
				else
					capitalizedSentence = clientSentence.toUpperCase() + '\n';

				if (capitalizedSentence != "DONE\n")
					outToClient.writeBytes(capitalizedSentence);
				else
					outToClient.writeBytes(bye);
			}

			System.out.println("\nThe session is completed.");
		}
	}
}
