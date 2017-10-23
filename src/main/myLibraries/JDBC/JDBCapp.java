package JDBC;

import java.sql.SQLException;
import java.util.Map;

public class JDBCapp {

	public static void main(String[] args) throws SQLException {
		// Get 1 appName with 1 id input
		Database database = new Database();
		System.out.println(database.getNameForApp("22726900"));

		
		System.out.println();
		System.out.println(database.getNameForApp("20385669"));
		System.out.println();

		// Get multiple appNames with id array
		int IDs[] = new int[3];
		IDs[0] = 22726900;
		IDs[1] = 8105;
		IDs[2] = 20401664;
		
		Map<String, String> idNameMap;
		idNameMap = database.getNamesForApps(IDs);
		
		System.out.println(idNameMap.get("22726900"));
		System.out.println(idNameMap.get("8105"));
		System.out.println(idNameMap.get("20401664"));

	}

}
