package General;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

public class URLApp {

	public static void main(String[] args) throws IOException {

		//               Protocol,    HostName,  Port Number, Page Name
		URL url = new URL("http", "www.kodejava.org", 80, "/index.html");
		url = new URL("http://www.kodejava.org:80/index.html");
		System.out.println(url);

		// Print HTML of The Page
		BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
		String line;
		while ((line = reader.readLine()) != null) {
			System.out.println(line);
		}

		reader.close();

	}

}
