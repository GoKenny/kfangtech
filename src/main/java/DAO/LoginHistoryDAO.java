package DAO;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import org.bson.types.ObjectId;
import org.json.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.WriteResult;

import dataCenter.MyMongoDB;

public class LoginHistoryDAO {

	DBCollection collection;
	MyMongoDB myMongoDB;

	public LoginHistoryDAO() {
		
		this.myMongoDB = new MyMongoDB();
		this.collection = myMongoDB.getDBconnection().getCollection("LoginHistory");
	}
	
	public void close() {
		myMongoDB.close();
	}
	
	public void recordBrowseHistory(String loginTime, String userName, String status, String ip, String country, String city, String latitude, String longtitude) {

		// 1. Set Where Statement
		BasicDBObject object = new BasicDBObject();

		object.put("loginTime", loginTime);
		object.put("userName", userName);
		object.put("status", status);
		object.put("ip", ip);
		object.put("country", country);
		object.put("city", city);
		object.put("organization", "browse");
		object.put("latitude", latitude);
		object.put("longtitude", longtitude);

		// 2. Save This Document To Database
		collection.insert(object);
		
		// 3. Remind JVM to Clean Garbage
		System.gc();
	}

	public String logOneHistory(String loginTime, String userName, String status, String ip, String country, String city, String latitude, String longtitude) {

		BasicDBObject query = new BasicDBObject();
		
		// 1. Set Where Statement
		query.put("loginTime", loginTime);
		query.put("userName", userName);
		query.put("status", status);
		query.put("ip", ip);
		query.put("country", country);
		query.put("city", city);
		query.put("organization", "loggedIn");
		query.put("latitude", latitude);
		query.put("longtitude", longtitude);

		collection.insert(query);

		return "ok";
	}
	
	public void removeBrowsingEntries (String ip){
		
		BasicDBObject whereObject = new BasicDBObject();
		whereObject.put("ip", ip);
		whereObject.put("status", "browse");
		collection.remove(whereObject);
		
	}
	
	public void removeOneHistory(String id){
		
		BasicDBObject whereObject = new BasicDBObject();
		whereObject.put("_id", new ObjectId(id));
		
		System.out.println(id);
		collection.remove(whereObject);
	}

	public JSONObject getAllLoginCoordinates() {

		// 1. Set Querying Object For Sorting
		BasicDBObject queryingObject = new BasicDBObject();
		queryingObject.put("loginTime", 1);

		// 2. Get Rows From DB
		DBCursor cursor = collection.find().sort(queryingObject);
		JSONObject arraysOfObjects = new JSONObject();

		while (cursor.hasNext()) {

			DBObject jsonRow = cursor.next();
			arraysOfObjects.append("records", jsonRow);
		}

		return arraysOfObjects;
	}
	
	public List<DBObject> unanalyzedBrowsing() {

		// 1. Select ip, loginTime
		BasicDBObject selectQuery = new BasicDBObject();
		selectQuery.put("_id", 1);
		selectQuery.put("loginTime", 1);
		selectQuery.put("ip", 1);

		// 2. Where status = "browse" and latitude = "browse"
		BasicDBObject queryingObject = new BasicDBObject();
		queryingObject.put("status", "browse");
		queryingObject.put("latitude", "browse");

		// 3. Get Rows From DB
		DBCursor cursor = collection.find(queryingObject,selectQuery).sort(new BasicDBObject("loginTime", 1));
		List<DBObject> listOfBrowsing = new ArrayList<DBObject>();
		
		while (cursor.hasNext()) {

			DBObject row = cursor.next();
			
			DBObject newRow = new BasicDBObject();
			newRow.put("id", row.get("_id").toString());
			newRow.put("loginTime", row.get("loginTime"));
			newRow.put("ip", row.get("ip"));
			
			listOfBrowsing.add(newRow);
		}
		
		return listOfBrowsing;
	}
	
	public List<DBObject> unanalyzedLoggedIn() {
		
		// 1. Select ip, loginTime
		BasicDBObject selectQuery = new BasicDBObject();
		selectQuery.put("_id", 1);
		selectQuery.put("ip", 1);
		selectQuery.put("loginTime", 1);

		// 2. Where status = "loggedIn"
		BasicDBObject queryingObject = new BasicDBObject();
		queryingObject.put("organization", "loggedIn");
		
		// 3. Get Rows From DB
		DBCursor cursor = collection.find(queryingObject,selectQuery).sort(new BasicDBObject("loginTime", 1));
		
		List<DBObject> listOfLogin = new ArrayList<DBObject>();
		while (cursor.hasNext()) {

			DBObject row = cursor.next();
			
			DBObject newRow = new BasicDBObject();
			newRow.put("id", row.get("_id").toString());
			newRow.put("loginTime", row.get("loginTime"));
			newRow.put("ip", row.get("ip"));
			
			listOfLogin.add(newRow);
		}

		return listOfLogin;
	}
	
	public void cleanSomeIPs(String ipToRemove) {

		// 1. Set Where Statement
		BasicDBObject queryingObject = new BasicDBObject();
		queryingObject.put("ip", ipToRemove);

		// 2. Get Rows From DB
		collection.remove(queryingObject);

	}
	
	public void cleanUnAnalyzedBrowsing() {

		// 1. Set Where Statement
		BasicDBObject queryingObject = new BasicDBObject();
		queryingObject.put("status", "browse");
		queryingObject.put("latitude", "browse");
		queryingObject.put("longtitude", "browse");

		// 2. Get Rows From DB
		collection.remove(queryingObject);

	}
	
	public void cleanSomeIPs(Pattern likeStatement) {

		// 1. Set Where Statement
		BasicDBObject whereObject = new BasicDBObject();
		whereObject.put("ip", likeStatement);

		// 2. Get Rows From DB
		collection.remove(whereObject);
	}
	
	public void getPatternedIPs(){
		
		Pattern likeStatement = Pattern.compile("66.249..*", Pattern.CASE_INSENSITIVE); // .* means %
		
		BasicDBObject queryingObject = new BasicDBObject();
		queryingObject.put("ip", likeStatement);
		
		DBCursor cursor = collection.find(queryingObject);
		while (cursor.hasNext()) {

			DBObject jsonRow = cursor.next();
			
			System.out.println(jsonRow);
			
		}
		
	}
	
	public void removeKennyHistory() {

		// 1. Set Where Statement
		BasicDBObject queryingObject = new BasicDBObject();
		queryingObject.put("userName", "kenny");

		// 2. Get Rows From DB
		collection.remove(queryingObject);
	}
	
	private String toMonthName(int month){
	    String[] monthNames = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
	    return monthNames[month];
	}

}
