package Servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import DAO.LoginHistoryDAO;

/**
 * To Record User's Login History
 * 
 * @author Kenny Fang
 */
@WebServlet("/LoginHistory")
public class LoginHistory extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	public LoginHistory() {
		
		super();
		
	}

	protected synchronized void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String jsonResult = "";
		
		// Get User Inputs
		String requestType = request.getParameter("requestType");

		// Get jsonResult According To Request Type
		if (requestType.equals("recordBrowseHistory"))
			jsonResult = recordBrowseHistory(request);
		
		if (requestType.equals("recordLogin"))
			jsonResult = recordOneLogin(request);
//		
		if (requestType.equals("userDecline"))
			jsonResult = recordManually(request);
		
		if (requestType.equals("browserNoSupport"))
			jsonResult = browserNoSupport(request);

		if (requestType.equals("getAllLoginCoordinates"))
			jsonResult = getAllLoginCoordinates(request);
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println(jsonResult);

	}
	
	private String recordBrowseHistory(HttpServletRequest request) {
		
		// 1. Collect The Data
		String userName = "browse";
		String loginTime = request.getParameter("loginTime");
		String status = "browse";
		String country = "browse";
		String city =	"browse";
		String latitude = "browse";
		String longtitude = "browse";
		
		String ip = request.getHeader("X-FORWARDED-FOR");  
        if(ip == null)  
        	ip = request.getRemoteAddr();  
		
		// 2. Save To The Database
        LoginHistoryDAO  loginHistoryDAO = new LoginHistoryDAO();
        loginHistoryDAO.recordBrowseHistory(loginTime, userName, status, ip, country, city, latitude, longtitude);
        loginHistoryDAO.close();
        
		return "";
	}

	private String recordOneLogin(HttpServletRequest request) {
		
		// 1. Collect The Data
		String loginTime = request.getParameter("loginTime");
		String userName = request.getParameter("userName");
		String status = "loggedIn";
		String country = "loggedIn";
		String city =	"loggedIn";
		String latitude = "LoggedIn";
		String longtitude = "LoggedIn";
		
		String ip = request.getHeader("X-FORWARDED-FOR"); 
		if(ip == null)  
			ip = request.getRemoteAddr(); 
		 
		// 2. Save To The Database
		LoginHistoryDAO  loginHistoryDAO = new LoginHistoryDAO();
		loginHistoryDAO.logOneHistory(loginTime, userName, status, ip, country, city, latitude, longtitude);
		
		// 3. Remove It's Previous Browsing Records
		loginHistoryDAO.removeBrowsingEntries(ip);
		loginHistoryDAO.close();

		return "";
	}
	
	private String recordManually(HttpServletRequest request) {
		
		// 1. Collect The Data
		String loginTime = request.getParameter("loginTime");
		String userName = request.getParameter("userName");
		String status = "loggedIn";
		String country = "userDecline";
		String city = "userDecline";
		String latitude ="47.603048";
		String longtitude = " -88.963494";
		
		String ip = request.getHeader("X-FORWARDED-FOR"); 
		if(ip == null)  
	       	ip = request.getRemoteAddr(); 

		// 2. Save To The Database
		LoginHistoryDAO  loginHistoryDAO = new LoginHistoryDAO();
		loginHistoryDAO.logOneHistory(loginTime, userName, status, ip, country, city, latitude, longtitude);
		
		// 3. Remove It's Previous Browsing Records
		loginHistoryDAO.removeBrowsingEntries(ip);
		loginHistoryDAO.close();
		
		return "";
	}
	
	private String browserNoSupport(HttpServletRequest request) {

		// 1. Collect The Data
		String loginTime = request.getParameter("loginTime");
		String userName = request.getParameter("userName");
		String status = "browserNoSupport";
		String ip = request.getRemoteAddr();
		String country = "browserNoSupport";
		String city = "browserNoSupport";
		String latitude ="47";
		String longtitude = " -88";
		
		// 2. Save To The Database
		LoginHistoryDAO  loginHistoryDAO = new LoginHistoryDAO();
		loginHistoryDAO.logOneHistory(loginTime, userName, status, ip, country, city, latitude, longtitude);
		loginHistoryDAO.close();
		
		return "";
	}

	private String getAllLoginCoordinates(HttpServletRequest request) {

		JSONObject jsonArray = new LoginHistoryDAO().getAllLoginCoordinates();

		return jsonArray.toString();
	}

}
