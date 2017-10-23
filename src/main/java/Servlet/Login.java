package Servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONObject;

import dataCenter.MyMongoDB;

/**
 * Servlet For The Login Page
 * 
 * @author Kenny Fang
 * 
 * */

@WebServlet("/Login")
public class Login extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

	protected synchronized void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected synchronized void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String jsonString = "";
		String requestType = request.getParameter("requestType");

		if (requestType.equals("login"))
			jsonString = login(request);

		if (requestType.equals("logout"))
			jsonString = logout(request);

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println(jsonString);
	}

	private String login(HttpServletRequest request) {

		String userName = request.getParameter("userName");
		String password = request.getParameter("password");

		// 1. Check If User Has Input Correct User Name And Password
		boolean isValidUser = false;
		if (userName.equals("kenny") && password.equals("ninjakenny"))
			isValidUser = true;

		if (userName.equals("user") && password.equals("temp"))
			isValidUser = true;

		if (userName.equals("beta") && password.equals("beta"))
			isValidUser = true;
		
		if (userName.equals("public") && password.equals("public"))
			isValidUser = true;

		JSONObject loginResult = new JSONObject();
		
		
		if (isValidUser) {
			
			// 2. Set "userRole", DB as Session Token
			HttpSession session = request.getSession();
			session.setAttribute("userName", userName);
			session.setAttribute("DBconnection", new MyMongoDB().getDBconnection());
			session.setMaxInactiveInterval(120 * 60);	// Active For 120 Minutes
			
			// 3. Show Login Status To Front End
			loginResult.put("loginResult", "loggedIn");
		}
		else {

			loginResult.put("loginResult", "incorrect");
		}


		return loginResult.toString();
	}

	private String logout(HttpServletRequest request) {

		JSONObject jsoObject = new JSONObject();

		// 2. Set "userRole", DB as Session Token
		HttpSession session = request.getSession();
		session.removeAttribute("userName");

		// 3. Show Login Status To Front End
		jsoObject.put("logoutStatus", "ok");

		return jsoObject.toString();

	}
	
}
