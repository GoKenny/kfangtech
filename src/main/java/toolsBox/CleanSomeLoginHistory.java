package toolsBox;

import java.net.UnknownHostException;
import java.util.regex.Pattern;

import DAO.LoginHistoryDAO;

public class CleanSomeLoginHistory {

	/** For Manually Deleting Some IPs */
	public static void main(String[] args) throws UnknownHostException {

		Pattern likeStatement = null;
		LoginHistoryDAO loginHistoryDAO = new LoginHistoryDAO();
		
		likeStatement = Pattern.compile("66.249.*", Pattern.CASE_INSENSITIVE); 
		loginHistoryDAO.cleanSomeIPs(likeStatement);
		
		likeStatement = Pattern.compile("99.241.*", Pattern.CASE_INSENSITIVE); 
		loginHistoryDAO.cleanSomeIPs(likeStatement);
		
		likeStatement = Pattern.compile("184.151.*", Pattern.CASE_INSENSITIVE); 
		loginHistoryDAO.cleanSomeIPs(likeStatement);
		
		likeStatement = Pattern.compile("170.153.*", Pattern.CASE_INSENSITIVE); 
		loginHistoryDAO.cleanSomeIPs(likeStatement);
		
		// Clean Unanalyzed Histories
		loginHistoryDAO.cleanUnAnalyzedBrowsing();
		
		System.out.println("Done.");
	}

}
