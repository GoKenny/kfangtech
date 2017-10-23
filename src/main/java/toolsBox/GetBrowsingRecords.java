package toolsBox;

import java.util.List;

import com.mongodb.DBObject;

import DAO.LoginHistoryDAO;

/**
 * rhc force-stop-app -a fang
 * ****/

public class GetBrowsingRecords {
	
	public static void main(String[] args) {
		
		LoginHistoryDAO loginHistoryDAO = new LoginHistoryDAO();
		
		List<DBObject> recordsArray = loginHistoryDAO.unanalyzedBrowsing();

		for (DBObject dbObject : recordsArray) {
			System.out.println(dbObject);
		}
		
		
	}
	
	

}
