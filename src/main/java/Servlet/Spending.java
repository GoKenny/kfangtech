package Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import DAO.SpendingDAO;

import com.mongodb.DB;
import com.mongodb.DBObject;

/**
 * Servlet For Spending Page
 * 
 * @author Kenny Fang
 * 
 * */

@WebServlet("/Spending")
public class Spending extends HttpServlet {

	private static final long serialVersionUID = 2L;

	private String userName;
	private DB db;


	public Spending() {
		super();
	}

	public synchronized void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String jsonResult = "";
		request.getRemoteAddr();

		// 1. Get Session Data
		this.userName = (String) request.getSession().getAttribute("userName");
		this.db = (DB) request.getSession().getAttribute("DBconnection");

		// 2. Get User Inputs
		String requestType = request.getParameter("requestType");

		// 3. Get jsonResult According To Request Type
		if (requestType.equals("getSpending"))
			jsonResult = getSpending(request);
		
		if (requestType.equals("addOneBill"))
			jsonResult = addOneBill(request);
		
		if (requestType.equals("getOneEntryData"))
			jsonResult = getOneEntryData(request);
		
		if (requestType.equals("updateEntry"))
			jsonResult = updateEntry(request);
		
		if (requestType.equals("removeOneEntry"))
			jsonResult = removeOneEntry(request);
		
		if (requestType.equals("getMonthlyTotals"))
			jsonResult = getMonthlyTotals(request);

		// 3. Return The JSon Object
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println(jsonResult);
	}

	private String getSpending(HttpServletRequest request) {

		// 1. Get User Inputs
		String month = request.getParameter("month");
		String year = request.getParameter("year");

		// 2. Get Entries Info From Database
		JSONObject listOfJSON = new SpendingDAO(db, userName).getSpending(month,year);

		return listOfJSON.toString();
	}
	
	private String addOneBill(HttpServletRequest request) {

		// 1. Collect User Inputs
		String amount = request.getParameter("amount");
		String comment = request.getParameter("comment");

		String year = request.getParameter("year");
		String month = request.getParameter("month");
		String date = request.getParameter("date");
		String typeValue = request.getParameter("typeValue");
		
		// 2. Insert Data to Database
		String insertResult  = new SpendingDAO(db, userName).addOneBill(amount, comment, year, month, date, Integer.valueOf(typeValue));

		// 3. Make The JSON Object to Return
		String jsonResult = "{  \"insertResult\" :   \"" +  insertResult + "\"   } ";

		return jsonResult;
	}
	
	private String getOneEntryData(HttpServletRequest request) {

		// 1. Get User Inputs
		String entryID = request.getParameter("entryID");
		
		// 2. Get The Data From Database
		DBObject dbObject  = new SpendingDAO(db, userName).getEntryByID(entryID);
		
		// 3. Make The JSON String To Return
		return dbObject.toString();

	}
	
	private String updateEntry(HttpServletRequest request) {

		// 1. Collect The Inputs
		String spendingIDtoUpdate = request.getParameter("spendingIDtoUpdate");
		
		String editAmount = request.getParameter("editAmount");
		String editComment = request.getParameter("editComment");

		String editYear = request.getParameter("editYear");
		String editMonth = request.getParameter("editMonth");
		String editDate = request.getParameter("editDate");
		String editSpendingType = request.getParameter("editSpendingType");
		
		
		// 2. Update The Data To The Database
		String updateStatus = new SpendingDAO(db, userName).updateEntry(spendingIDtoUpdate, editAmount, editComment, editYear, editMonth, editDate, Integer.valueOf(editSpendingType));
		
		// 3. Make The JSON String To Return
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("updateStatus", updateStatus);
		
		return jsonObject.toString();

	}
	
	private String removeOneEntry(HttpServletRequest request) {

		// 1. Get The EntryID to Remove
		String entryIdToRemove = request.getParameter("entryIdToRemove");
		
		// 2. Update The Data To The Database
		String removeStatus = new SpendingDAO(db, userName).removeOneEntry(entryIdToRemove);
		
		// 3. Make The JSON String To Return
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("removeStatus", removeStatus);
		
		return jsonObject.toString();
	}
	
	private String getMonthlyTotals(HttpServletRequest request) {

		// 1. Get The Year For Monthly Spendings
		String year = request.getParameter("year");
		
		// 2. Get The Totals From Database
		String monthlyTotals = new SpendingDAO(db, userName).getMonthlyTotals(year);
		
		// 3. Format The Return JSON To An Array
		// 3.1 Covert To JSON Object
		JSONObject jsonObject = new JSONObject(monthlyTotals); 
		
		JSONObject theObject ;
		Double theSum;
		JSONObject theNewArray = new JSONObject();
		
		DecimalFormat decimalFormat = new DecimalFormat("0.00");
		
		for (int i = 0; i < jsonObject.getJSONArray("sums").length(); i++) {
			
			// 3.2. Get The Object
			theObject = (JSONObject) jsonObject.getJSONArray("sums").get(i);
			
			// 3.3 Get The "sum" in This Object
			theSum = theObject.getDouble("sum");
			theSum = Double.parseDouble( decimalFormat.format(theSum) );
			
			// 3.4 Append To The New Array
			theNewArray.append("monthlyTotals", theSum);
		}
		
		return theNewArray.toString();
	}
	
}
