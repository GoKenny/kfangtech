package Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import DAO.LoginHistoryDAO;

import com.mongodb.DBObject;


@WebServlet(description = "Creep The Traffics of My Webapp", urlPatterns = { "/Traffic" })
public class Traffic extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	LoginHistoryDAO loginHistoryDAO;
       
    public Traffic() {
        loginHistoryDAO = new LoginHistoryDAO();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    	cleanSomeIPs();
    	
    	String jsonResult = "";
    	
    	String requestType = request.getParameter("requestType");
    	
    	if (requestType.equals("getUnanalyzed"))
			jsonResult = getUnanalyzed(request);
    	
    	if (requestType.equals("removeOne"))
			jsonResult = removeOne(request);
    	

    	response.setContentType("text/html");
    	PrintWriter out = response.getWriter();
    	out.println(jsonResult);
    }
    
    
    
    private String getUnanalyzed (HttpServletRequest request){
    	
    	// 1. Just Browsing
    	List<DBObject> recordsArray = loginHistoryDAO.unanalyzedBrowsing();
    	
    	JSONObject jsonObject = new JSONObject();
    	jsonObject.put("unanalyzedBrowsings", recordsArray);
    	
    	// 2. LoggedIn 
    	recordsArray = loginHistoryDAO.unanalyzedLoggedIn();
    	jsonObject.put("unanalyzedLogins", recordsArray);
    	
    	
    	// 3. Close The Database Connection
    	// loginHistoryDAO.close();
    	
    	return jsonObject.toString();
    	
    }
    
    private String removeOne(HttpServletRequest request){
    	
    	System.out.println(request.getParameter("id"));
    	loginHistoryDAO.removeOneHistory(request.getParameter("id"));;
    	return this.getUnanalyzed(request);
    }
    
    
    private void cleanSomeIPs() { 
		
		loginHistoryDAO = new LoginHistoryDAO();
		Pattern likeStatement = null;

		// 1. My Own Account
		loginHistoryDAO.removeKennyHistory();

		// 2. Local Debugging IPs
		loginHistoryDAO.cleanSomeIPs("127.0.0.1");
//		loginHistoryDAO.cleanSomeIPs("0:0:0:0:0:0:0:1");

		likeStatement = Pattern.compile("192.168.0.*", Pattern.CASE_INSENSITIVE); // .* means %
		loginHistoryDAO.cleanSomeIPs(likeStatement);
		
		// 3. Ceridian
		loginHistoryDAO.cleanSomeIPs("170.153.1.1");
		
		/* 
		 * 4. My Public IPs At Home 
		 * 
		 * 173.34.1..* - 527 Bank Street, Ottawa
		 * 
		 * 76.70.117..* 
		 * 70.30.103..*
		 * 71.19.175..*
		 * 70.48.113..*
		 * 76.66.85
		 * 76.66.153.
		 * 
		 * - 3866 Albion Road, Ottawa
		 * 
		 * 
		 * 
		 * 99.241.1..*
		 * - 1785 Riverside Drive, Unit 1804
		 * 
		 * 
		 * */
		likeStatement = Pattern.compile("99.241.1..*", Pattern.CASE_INSENSITIVE);
		loginHistoryDAO.cleanSomeIPs(likeStatement);
		
		// 5. GoogleBot
		likeStatement = Pattern.compile("66.249..*", Pattern.CASE_INSENSITIVE);
		loginHistoryDAO.cleanSomeIPs(likeStatement);
		
		// 6. Bing
		likeStatement = Pattern.compile("61.135..*", Pattern.CASE_INSENSITIVE);
		loginHistoryDAO.cleanSomeIPs(likeStatement);

		// 6. Baidu
		likeStatement = Pattern.compile("199.30..*", Pattern.CASE_INSENSITIVE);
		loginHistoryDAO.cleanSomeIPs(likeStatement);
		
//		loginHistoryDAO.close();	// Clean The Huge Memory Space By MongoDB

    }

}
