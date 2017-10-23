package Servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import toolsBox.TimeManager;
import DAO.ScheduleDAO;

import com.mongodb.DB;
import com.mongodb.DBObject;

@WebServlet("/Schedule")
public class Schedule extends HttpServlet {

	private static final long serialVersionUID = 2L;

	private String userName;
	private DB db;


	public Schedule() {
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
		if (requestType.equals("getSchedule"))
			jsonResult = getSchedule(request);
		
		if (requestType.equals("addOneEntry"))
			jsonResult = addOneEntry(request);
		
		if (requestType.equals("toggleStatus"))
			jsonResult = toggleStatus(request);
		
		if (requestType.equals("getOneEntryData"))
			jsonResult = getOneEntryData(request);
		
		if (requestType.equals("updateEntry"))
			jsonResult = updateEntry(request);
		
		if (requestType.equals("removeOneEntry"))
			jsonResult = removeOneEntry(request);

		// 3. Return The JSon Object
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println(jsonResult);
	}

	private String getSchedule(HttpServletRequest request) {

		// 1. Get User Inputs
		String month = request.getParameter("month");
		String year = request.getParameter("year");

		// Default Current Year And Month When No Inputs
		TimeManager timeManager = new TimeManager();
		if (month.equals("")) 
			month = timeManager.getCurrentMonth();

		if (year.equals(""))
			year = timeManager.getCurrentYear();

		// 2. Get Entries Info From Database
		List<DBObject> jsonList = new ScheduleDAO(db, userName).getEntries(month,year);

		// 3. Make The JSON Object to Return
		JSONObject arraysOfObjects = new JSONObject();
		
		if (jsonList.size() > 0) {
			
			DecimalFormat decimalFormat = new DecimalFormat("00.00");
			
			String date;
			String from;
			String to;
			String status;

			int lastWeekNumb = 0;
			int weekNumb;

			String dayOfWeek;
			String lastEntryDate = "";

			DBObject jsonRow;

			for (int i = 0; i < jsonList.size(); i++) {
				
				JSONObject jsonObject = new JSONObject();

				// 3. Row
				jsonRow = jsonList.get(i);

				date = jsonRow.get("dateNumb").toString();
				weekNumb = timeManager.getWeekNumb(year, month, date);
				dayOfWeek = timeManager.getDayOfWeek(year, month, date);

				// Format The day
				//				StringTransformer st = new StringTransformer();

				// Format The Start Time
				from = jsonRow.get("startTime").toString();
				if (Double.parseDouble(from) < 0)
					from = "Anytime";
				else
					from = decimalFormat.format(Double.valueOf(from));

				// Format The End Time
				to = jsonRow.get("endTime").toString();
				if (Double.parseDouble(to) < 0)
					to = "";
				else
					to = decimalFormat.format(Double.valueOf(to));

				int today = Integer.valueOf(timeManager.getCurrentDate());
				int intDate = Integer.valueOf(date);

				// Format Status
				status = jsonRow.get("status").toString();

				jsonObject.put("id", jsonRow.get("_id").toString() 	);
				jsonObject.put("month", month);
				jsonObject.put("weekNumb", weekNumb);
				jsonObject.put("status", status);
				jsonObject.put("dayOfWeek", dayOfWeek);
				jsonObject.put("date", date);
				jsonObject.put("from", from);
				jsonObject.put("to", to);
				jsonObject.put("place",  jsonRow.get("place").toString());
				jsonObject.put("event", jsonRow.get("activity").toString());

				if (status.equals("pending")) {
					
					// Make today color
					if (intDate == today &&  timeManager.getCurrentMonth().equals(jsonRow.get("month").toString()) && timeManager.getCurrentYear().equals(jsonRow.get("year").toString()))
						jsonObject.put("today", timeManager.getNow());

					else
						jsonObject.put("today", "no");
				}

				// Determine If This Row For The Same Day
				if (date.equals(lastEntryDate))
					jsonObject.put("sameDay", "yes");
				else {

					// Determine If This Row Is For Next Week
					if (weekNumb != lastWeekNumb)
						jsonObject.put("nextWeek", "yes");

					jsonObject.put("sameDay", "no");
				}

				lastEntryDate = date;
				lastWeekNumb = weekNumb;

				arraysOfObjects.append("rows", jsonObject);
			}

		} 
		
		return arraysOfObjects.toString();
	}
	
	private String addOneEntry(HttpServletRequest request) {

		// 1. Get User Inputs
		String year = request.getParameter("year");
		String month = request.getParameter("month");
		String date = request.getParameter("date");
		String from = request.getParameter("from");
		String to = request.getParameter("to");
		String place = request.getParameter("place");
		String event = request.getParameter("event");
		
		if (from.equals("")) 
			from = "-1";
		
		if (to.equals("")) 
			to="-1";

		// 2. Insert Data to Database
		String insertResult  = new ScheduleDAO(db, userName).addOneEntry(year, month, date, from, to, place, event);

		// 3. Make The JSON Object to Return
		String jsonResult = "{  \"insertResult\" :   \"" +  insertResult + "\"   } ";

		return jsonResult;

	}
	
	private String toggleStatus(HttpServletRequest request) {

		// 1. Get User Inputs
		String entryID = request.getParameter("entryID");
		
		// 2. Update This Entry in Database
		String updateResult  = new ScheduleDAO(db, userName).toggleRecord(entryID);

		// 3. Make The JSON Object to Return
		String jsonResult = "{  \"updateResult\" :   \"" +  updateResult + "\"   } ";
		
		return jsonResult;
	}
	
	private String getOneEntryData(HttpServletRequest request) {

		// 1. Get User Inputs
		String entryID = request.getParameter("entryID");
		
		// 2. Get The Data From Database
		DBObject dbObject  = new ScheduleDAO(db, userName).getEntryByID(entryID);
		
		// 3. Make The JSON String To Return
		JSONObject jsonObject = new JSONObject();
		
		jsonObject.put("id", dbObject.get("id"));
		jsonObject.put("year", dbObject.get("year"));
		jsonObject.put("month", dbObject.get("month"));
		jsonObject.put("date", dbObject.get("dateNumb"));
		
		DecimalFormat decimalFormat = new DecimalFormat("00.00");
		String from = dbObject.get("startTime").toString();
		if (Double.parseDouble(from) < 0)
			jsonObject.put("from", "");
		else
			jsonObject.put("from", decimalFormat.format( Double.valueOf(from) ) );
		
		String to = dbObject.get("endTime").toString();
		if (Double.parseDouble(to) < 0)
			jsonObject.put("to", "");
		else
			jsonObject.put("to", decimalFormat.format( Double.valueOf(to) ) );
		
		jsonObject.put("place", dbObject.get("place"));
		jsonObject.put("event", dbObject.get("activity"));
		jsonObject.put("status", dbObject.get("status"));

		return jsonObject.toString();

	}
	
	private String updateEntry(HttpServletRequest request) {

		// 1. Collect The Inputs
		String entryIDtoUpdate = request.getParameter("entryIDtoUpdate");
		
		String editYear = request.getParameter("editYear");
		String editMonth = request.getParameter("editMonth");
		String editDate = request.getParameter("editDate");
		
		String editFrom = request.getParameter("editFrom");
		String editTo = request.getParameter("editTo");
		
		String editPlace = request.getParameter("editPlace");
		String editEvent = request.getParameter("editEvent");
		
		String editStatus = request.getParameter("editStatus");
		
		if (editFrom.equals("")) 
			editFrom = "-1";
		if (editTo.equals("")) 
			editTo = "-1";
		
		// 2. Update The Data To The Database
		String updateStatus = new ScheduleDAO(db, userName).updateEntry(entryIDtoUpdate, editYear, editMonth, editDate, editFrom, editTo, editPlace, editEvent, editStatus);
		
		// 3. Make The JSON String To Return
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("updateStatus", updateStatus);
		
		return jsonObject.toString();

	}
	
	private String removeOneEntry(HttpServletRequest request) {

		// 1. Get The EntryID to Remove
		String entryIdToRemove = request.getParameter("entryIdToRemove");
		
		// 2. Update The Data To The Database
		String removeStatus = new ScheduleDAO(db, userName).removeOneEntry(entryIdToRemove);
		
		// 3. Make The JSON String To Return
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("removeStatus", removeStatus);
		
		return jsonObject.toString();
	}
	
}
