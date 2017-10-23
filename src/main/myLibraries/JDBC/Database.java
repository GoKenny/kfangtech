package JDBC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

public class Database {

	private Connection connection;

	public Database() {

		String url = "jdbc:oracle:thin:@//dbm05cnc.rim.net:1524/PAPPWR";

		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			connection = DriverManager.getConnection(url, "software_dev_ro", "ottawa2013");
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public Map<String, String> getNamesForApps(int[] appIDs) throws SQLException {

		Map<String, String> idNameMap = new HashMap<String, String>();

		// make id range for query
		String idRange = "(";
		for (int i = 0; i < appIDs.length; i++)
			idRange += appIDs[i] + ",";
		idRange = idRange.substring(0, idRange.length() - 1) + ")";

		// Execute SQL
		Statement st = ((java.sql.Connection) connection).createStatement();
		String sqlQuery = "select id,name from content where id in" + idRange;
		ResultSet qResult = st.executeQuery(sqlQuery);

		// loop through each row and construct id and name map
		try {
			while (qResult.next())
				idNameMap.put(qResult.getString(1), qResult.getString(2));

		} catch (SQLException e) {
			e.printStackTrace();
		}

		st.close();
		qResult.close();
		return idNameMap;
	}
	
	public Map<String, String> getThumbnailIDsFor(int[] appIDs) throws SQLException {

		Map<String, String> idThumbnailID = new HashMap<String, String>();

		// make id range for query
		String idRange = "(";
		for (int i = 0; i < appIDs.length; i++)
			idRange += appIDs[i] + ",";
		idRange = idRange.substring(0, idRange.length() - 1) + ")";

		// Execute SQL
		Statement st = ((java.sql.Connection) connection).createStatement();
		String sqlQuery = "select contentid,imageid from contentimage where contentimagetypeid = 1 and platformdevicetypemapid is null and contentid in " + idRange;
		ResultSet qResult = st.executeQuery(sqlQuery);

		// loop through each row and construct id and name map
		try {
			while (qResult.next())
				idThumbnailID.put(qResult.getString(1), qResult.getString(2));
		} catch (SQLException e) {
			e.printStackTrace();
		}

		st.close();
		qResult.close();
		return idThumbnailID;
	}
	
	public String getThumbnailIdFor(String appID) throws SQLException{
		
		String thumbnailID = null;
		
		// Execute SQL
		Statement st = ((java.sql.Connection) connection).createStatement();
		String sqlQuery ="select imageid from contentimage where contentimagetypeid = 1 and rownum=1 and contentID =" + appID ;
		ResultSet qResult = st.executeQuery(sqlQuery);
		
		try {
			qResult.next();
			thumbnailID = qResult.getString(1);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return thumbnailID;
	}
	
	public String getNameForApp(String appID) throws SQLException {

		String appName = null;

		Statement st = ((java.sql.Connection) connection).createStatement();
		String sqlQuery = "select name from content where id=" + appID;
		ResultSet qResult = st.executeQuery(sqlQuery);

		try {
			qResult.next();
			appName = qResult.getString(1);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return appName;
	}
	
	public void close(){
		try {
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

}
