package JDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
/**import the mysql-connector-java-5.1.20-bin.jar to the project first, which is located in mySQL installation folder*/
public class DataManager {

	private int errorCode = 0;
	private Connection con;

	public int getErrorCode() {
		return errorCode;
	}

	public DataManager() {
		String url = "jdbc:mysql://isel.cs.unb.ca:3306/cs2043t3db";

		try {
			con = DriverManager.getConnection(url, "cs2043team3", "cs2043t3");
		} catch (SQLException e) {
			System.err.println("Database connection error.");
			errorCode = 2;
		}
	}

	// Get 1 event name according to given event ID
	public String getEventName(String eventId) {
		String result = null;

		try {
			Statement st = ((java.sql.Connection) con).createStatement();
			String sqlQuery = "select event_name from event_info where event_id=" + eventId + ";";
			ResultSet rs = st.executeQuery(sqlQuery);

			result = rs.getString(1);
			errorCode = 0;
		} catch (SQLException e) {
			System.err.println("SQL error.");
			errorCode = 2;
		}
		return result;
	}

	// Get available events
	public String[] getAvailableEvents() {
		String[] result = null;

		try {
			Statement st = ((java.sql.Connection) con).createStatement();
			String sqlQuery = "select event_name from event_info where approval_status='approved'";

			ResultSet rs = st.executeQuery(sqlQuery);

			// Get the column size
			rs.last();
			int size = rs.getRow();
			rs.first();
			result = new String[size];

			for (int i = 0; i < size; i++)
				result[i] = rs.getString(i+1);

			errorCode = 0;
		} catch (SQLException e) {
			System.err.println("SQL error.");
			errorCode = 2;
		}
		return result;
	}

	// Get 1 user name according to the given user Id
	public String getUserName(String userId) {
		String result = null;

		try {
			Statement st = ((java.sql.Connection) con).createStatement();
			String sqlQuery = "select user_name from user_account where user_id=" + userId + ";";
			ResultSet rs = st.executeQuery(sqlQuery);

			result = rs.getString(1);
			errorCode = 0;
		} catch (SQLException e) {
			System.err.println("SQL error.");
			errorCode = 2;
		}
		return result;
	}

	// Get what the user have registered
	public String[] getRegisteredEvents(int user_id) {
		String[] result = null;

		try {
			Statement st = ((java.sql.Connection) con).createStatement();
			String sqlQuery = "select event_id from event_registration where user_id ='" + user_id + "'";

			ResultSet rs = st.executeQuery(sqlQuery);

			// Get the column size
			rs.last();
			int size = rs.getRow();
			rs.first();
			result = new String[size];

			for (int i = 0; i < size; i++)
				result[i] = rs.getString(i+1);

			errorCode = 0;
		} catch (SQLException e) {
			System.err.println("SQL error.");
			errorCode = 2;
		}
		return result;
	}

	// Create 1 event
	public void createOneEvent(String event_name, String community, String eventDiscription, int maximumParticipant) {
		try {
			Statement st = con.createStatement();
			String sqlQuery = "insert into event_info(event_name,community,event_discription, maximum_participant) " + "values ('" + event_name + "','" + community + "','" + eventDiscription + "',"
					+ maximumParticipant + ");";
			st.executeUpdate(sqlQuery);
			errorCode = 0;
		} catch (SQLException e) {
			System.err.println("SQL error.");
			errorCode = 2;
		}
	}

	// Create 1 user account
	public void createUserAccount(String userName, String password, String role) {
		try {
			Statement st = con.createStatement();
			String sqlQuery = "insert into user_account(user_name,password,role) values ('" + userName + "','" + password + "','" + role + "')";
			st.executeUpdate(sqlQuery);
			errorCode = 0;
		} catch (SQLException e) {
			System.err.println("SQL error.");
			errorCode = 2;
		}
	}

	// Register 1 event
	public void registerOneEvent(String userId, String eventId) {
		try {
			Statement st = con.createStatement();
			String sqlQuery = "insert into event_registration values ('" + userId + "','" + eventId + "')";
			st.executeUpdate(sqlQuery);
			errorCode = 0;
		} catch (SQLException e) {
			System.err.println("SQL error.");
			errorCode = 2;
		}
	}

	// temporary for testing those methods above, should be removed.
	public static void main(String[] args) {
		String[] events;

		DataManager dm = new DataManager();
		events = dm.getRegisteredEvents(1);

		for (int i = 0; i < events.length; i++) {
			System.out.println(events[i]);
		}

	}

}
