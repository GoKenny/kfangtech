package dataCenter;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;


/**
 * My Local Oracle Database
 * 
 * @author Kenny Fang
 * 
 * */

public class OracleDB {

	private Connection connection;
	private Statement statement;

	public OracleDB() {

		String url = "jdbc:oracle:thin:@Kenny:1521/orcl";
		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			this.connection = DriverManager.getConnection(url, "kenny", "kuinai");
			this.statement = ((java.sql.Connection) connection).createStatement();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/** Memo Project */
	public void addOneEntry(String month, String date, String startTime, String endTime, String place, String event) {

		String conditions = month + "," + date + ",'" + startTime + "','" + endTime + "','" + place + "','" + event + "',";

		ResultSet resultSet;
		String sqlQuery = "insert into memo values (memoID_sequence.nextval,2014," + conditions + "'Pending')";

		try {

			resultSet = statement.executeQuery(sqlQuery);

			resultSet = statement.executeQuery("commit");
			resultSet.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

	public List<String> getEntriesFor(String month, String year) {

		List<String> entries = new ArrayList<String>();

		ResultSet resultSet;
		String queryString = "select id,dateNumb,startTime,endTime,place,event,status from memo where month=" + month + "and year=" + year + " order by dateNumb,startTime";

		try {
			resultSet = statement.executeQuery(queryString);

			while (resultSet.next())
				entries.add(resultSet.getString(1) + "__" + resultSet.getString(2) + "__" + resultSet.getString(3) + "__" + resultSet.getString(4) + "__" + resultSet.getString(5) + "__" + resultSet.getString(6) + "__" + resultSet.getString(7));

			resultSet.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return entries;
	}

	public void completeOneEntryFor(String id) {

		ResultSet resultSet;
		String sqlQuery = "update memo set status='Completed' where id=" + id;

		try {
			resultSet = statement.executeQuery(sqlQuery);
			resultSet.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void updateEntry(String setStatement, String id) {

		ResultSet resultSet;
		String sqlQuery = "update memo set " + setStatement + " where id=" + id;

		try {
			resultSet = statement.executeQuery(sqlQuery);
			resultSet.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	/** Spending Project */
	public List<String> getSpendingFor(String month, String year) {

		List<String> entries = new ArrayList<String>();

		ResultSet resultSet;
		String queryString = "select dateNumb,amount,comments from Spending where month=" + month + " and year=" + year + " and type=1 order by dateNumb,id";

		try {
			resultSet = statement.executeQuery(queryString);

			while (resultSet.next())
				entries.add(resultSet.getString(1) + "__" + resultSet.getString(2) + "__" + resultSet.getString(3));

			resultSet.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return entries;
	}

	public List<String> getMiscellaneous() {

		List<String> entries = new ArrayList<String>();

		ResultSet resultSet;

		String queryString = "select year, month, dateNumb,amount,comments from Spending where type = 2 order by year, month, dateNumb";

		try {
			resultSet = statement.executeQuery(queryString);

			while (resultSet.next())
				entries.add(resultSet.getString(1) + "__" + resultSet.getString(2) + "__" + resultSet.getString(3) + "__" + resultSet.getString(4) + "__" + resultSet.getString(5));

			resultSet.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return entries;
	}

	public void addOneBill(String month, String date, String year, String amount, String comments, String type) {

		String conditions = "(SpendingID_sequence.nextval," + year + "," + month + "," + date + "," + amount + ",'" + comments + "'," + type + ")";

		ResultSet resultSet;
		String sqlQuery = "insert into Spending values " + conditions;

		try {
			resultSet = statement.executeQuery(sqlQuery);
			resultSet.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

	public void close() {

		ResultSet resultSet;
		String sqlQuery = "commit";

		try {

			resultSet = statement.executeQuery(sqlQuery);

			statement.close();
			resultSet.close();
			connection.close();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
	}

}
