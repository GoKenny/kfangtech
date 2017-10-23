package DAO;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

public class ScheduleDAO {

	DBCollection collection;
	BasicDBObject query;

	public ScheduleDAO(DB db, String userName) {

		// Determine What Table This User Can Interact With
		if (userName.equals("kenny")) 
			this.collection = db.getCollection("MyActivities"); 
		else
			this.collection = db.getCollection("MyActivitiesDemo");
		
		this.query = new BasicDBObject();
	}

	public List<DBObject> getEntries(String month, String year) {

		// 1. Set Where Statement
		query.put("month", Integer.parseInt(month));
		query.put("year", Integer.parseInt(year));

		// 2. Get Rows From DB, Order By dateNumb and startTime 
		DBCursor cursor = collection.find(query).sort(new BasicDBObject("dateNumb",1).append("startTime",1)) ;
//		while (cursor.hasNext()) {
//
//			jsonRow = cursor.next();
//			jsonList.add(jsonRow);
////			System.out.println(jsonRow); // row.get("_id"), row.get("year")
//		}

		return cursor.toArray();

	}
	
	public String addOneEntry(String year,String month, String date, String from, String to, String place, String event  )  {

		// 1. Set Where Statement
		query.put("year", Integer.parseInt(year));
		query.put("month", Integer.parseInt(month));
		query.put("dateNumb", Integer.parseInt(date));
		query.put("startTime", Double.parseDouble(from));
		query.put("endTime", Double.parseDouble(to));
		query.put("place", place);
		query.put("activity", event);
		query.put("status", "pending");
		
		collection.insert(query);

		return "ok";
	}
	
	public String toggleRecord(String entryID)  {

		/**1. Get The Original Status And Toggle It*/
		DBObject originalObject =  getEntryByID(entryID);
		String status = originalObject.get("status").toString();
		if (status.equals("completed")) 
			status = "pending";
		else
			status = "completed";
		
		/**2. Update This Record */
		// 1.  Where _id = ?
		BasicDBObject oldDocument = new BasicDBObject();
		oldDocument.put("_id", new ObjectId(entryID) );
	 
		// 2. set status = ?
		BasicDBObject newDocument = new BasicDBObject();
		newDocument.put("status", status);
	 
		// 3. make the object that does the update
		BasicDBObject updateObj = new BasicDBObject();
		updateObj.put("$set", newDocument);
		collection.update(oldDocument, updateObj);
		
		return "ok";
	}
	
	public DBObject getEntryByID(String entryID) {

		DBObject dbObject = null;

		// 1. Set Where Statement
		query.put("_id", new ObjectId(entryID) );

		// 2. Get The Row From DB
		DBCursor cursor = collection.find(query);
		if (cursor.hasNext()) 
			dbObject = cursor.next();

		return dbObject;
	}
	
	public String updateEntry(String entryID, String year, String month, String date, String from, String to, String place, String event, String status) {

		// 1. get the old entry 
		BasicDBObject oldDocument = new BasicDBObject();
		oldDocument.put("_id", new ObjectId(entryID) );
	 
		// 2. make the new entry
		BasicDBObject newDocument = new BasicDBObject();
		
		newDocument.put("year", Integer.parseInt(year));
		newDocument.put("month", Integer.parseInt(month));
		newDocument.put("dateNumb", Integer.parseInt(date));
		
		newDocument.put("startTime", Double.parseDouble(from));
		newDocument.put("endTime", Double.parseDouble(to));
		
		newDocument.put("place", place);
		newDocument.put("activity", event);
		newDocument.put("status", status);
	 
		// 3. make the object that does the update
		BasicDBObject updateObj = new BasicDBObject();
		updateObj.put("$set", newDocument);
		collection.update(oldDocument, updateObj); // update one
		
		return "ok";
	}

	public String removeOneEntry(String entryIdToRemove) {

		query.put("_id", new ObjectId(entryIdToRemove) );
		collection.remove(query);
		
		return "ok";
	}
	
}
