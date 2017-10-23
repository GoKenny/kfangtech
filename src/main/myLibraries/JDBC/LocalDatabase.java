package JDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

public class LocalDatabase {

	public static void main(String[] args) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		LocalDatabase database = new LocalDatabase();
		String info =database.getNameForApp(1);
		System.out.println(info);
	}

	private Connection connection;

	public LocalDatabase() throws InstantiationException, IllegalAccessException, ClassNotFoundException {

		String url = "jdbc:oracle:thin:@kuinai-think:1521/orcl";
		try {
			connection = DriverManager.getConnection(url, "kenny",
					"kuinai");
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

	// Get 1 name with 1 id input
	public String getNameForApp(int appID) throws SQLException {

		String appName = null;

		Statement st = ((java.sql.Connection) connection).createStatement();
		String sqlQuery = "select title from book";
		ResultSet qResult = st.executeQuery(sqlQuery);

		try {
			qResult.next();
			appName = qResult.getString(1);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return appName;

	}

	// Get Multiple Names With Id Array, Return String
	public String[] getNamesForApp(int[] appIDs) throws SQLException {

		String appName[] = new String[appIDs.length];

		// make id range for qurery
		String idRange = "(";
		for (int i = 0; i < appIDs.length; i++)
			idRange += appIDs[i] + ",";
		idRange = idRange.substring(0, idRange.length() - 1) + ")";

		Statement st = ((java.sql.Connection) connection).createStatement();
		String sqlQuery = "select name from content where id in" + idRange;
		ResultSet qResult = st.executeQuery(sqlQuery);

		try {
			for (int i = 0; qResult.next(); i++)
				appName[i] = qResult.getString(1);
		} catch (SQLException e) {
			e.printStackTrace();
		}

		st.close();
		return appName;
	}

	// // Get Multiple Names With Id Array, Return Map
	@SuppressWarnings("unused")
	public Map<String, String> getNamesForApps(int[] appIDs)
			throws SQLException {

		Map<String, String> idNameMap = new HashMap<String, String>();

		// make id range for qurery
		String idRange = "(";
		for (int i = 0; i < appIDs.length; i++)
			idRange += appIDs[i] + ",";
		idRange = idRange.substring(0, idRange.length() - 1) + ")";

		// Execute SQL
		Statement st = ((java.sql.Connection) connection).createStatement();
		String sqlQuery = "select id,name from content where id in" + idRange;
		ResultSet qResult = st.executeQuery(sqlQuery);

		// loop through each row and get name for each app id
		try {
			for (int i = 0; qResult.next(); i++)
				idNameMap.put(qResult.getString(1), qResult.getString(2));

		} catch (SQLException e) {
			e.printStackTrace();
		}

		st.close();
		qResult.close();
		return idNameMap;
	}

}
