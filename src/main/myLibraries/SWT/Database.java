package SWT;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Database {
	private Connection connection;

	public Database() {

		String url = "jdbc:oracle:thin:@//dbm05cnc.rim.net:1524/PAPPWR";

		try {
			connection = DriverManager.getConnection(url, "software_dev_ro", "awottdev");
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

	public String[] getNameForApp(int[] appID) throws SQLException {
		String appName[] = new String[appID.length];

		// make id range for qurery
		String idRange = "(";
		for (int i = 0; i < appID.length; i++)
			idRange += appID[i] + ",";
		idRange = idRange.substring(0, idRange.length() - 1) + ")";

		// id in(1,2,3,4,5,6,7,8,9,9,0,,9)
		Statement st = ((java.sql.Connection) connection).createStatement();
		String sqlQuery = "select name from content where id in" + idRange;
		ResultSet qResult = st.executeQuery(sqlQuery);
		
		// loop through each row and get name for each app id
		try {
			for (int i = 0; qResult.next(); i++)
				appName[i] = qResult.getString(1);
		} catch (SQLException e) {
			e.printStackTrace();
		}

		st.close();
		return appName;
	}

}
