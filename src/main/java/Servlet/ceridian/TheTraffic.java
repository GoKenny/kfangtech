package Servlet.ceridian;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/erd/TheTraffic")
public class TheTraffic extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public TheTraffic() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String accessTime = request.getParameter("accessTime");

		String ip = request.getHeader("X-FORWARDED-FOR");
		if (ip == null)
			ip = request.getRemoteAddr();

		System.out.println(ip + ": " + accessTime);

		// true -> write to the end of file
		PrintWriter printWriter = new PrintWriter(new BufferedWriter(new FileWriter("C:\\Users\\kfang\\Desktop\\trafficInfo", true)));
		printWriter.write(ip + ": " + accessTime + "\n");
		printWriter.close();

	}

}
