package toolsBox;

import DAO.LoginHistoryDAO;

public class LikeStatement {

	public static void main(String[] args) {
		
		LoginHistoryDAO loginHistoryDAO = new LoginHistoryDAO();
		
		loginHistoryDAO.getPatternedIPs();
		
		
	}
	
}
