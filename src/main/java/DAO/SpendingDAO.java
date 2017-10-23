package DAO;

/**
 * @author Kenny Fang
 * */
import java.util.ArrayList;

import org.bson.types.ObjectId;
import org.json.JSONObject;

import com.mongodb.AggregationOutput;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.WriteResult;

public class SpendingDAO {

	DBCollection collection;

	public SpendingDAO(DB db, String userName) {
		
		// Determine What Table This User Can Interact With
		if (userName.equals("kenny")) 
			this.collection = db.getCollection("MySpendings");
		else	
			this.collection = db.getCollection("MySpendingsDemo");  
	}

	/**
	 * Type
	 * 	1: Grocery
	 * 	2: Miscellaneous
	 * 	3: Fixed
	 * */
	public JSONObject getSpending(String month, String year) {
		
		/**
		 * where year =? and month = ? and type = 1
		 */
		BasicDBObject query = new BasicDBObject();
		
		// 1. month = ?, year = ?
		query.put("month", Integer.parseInt(month));
		query.put("year", Integer.parseInt(year));

		// 2. or Type = 1, or Type = 2, or Type = 3
		ArrayList<BasicDBObject> orArray = new ArrayList<BasicDBObject>();
		orArray.add(new BasicDBObject("type", 1));  // 1: Grocer
		orArray.add(new BasicDBObject("type", 2));	// 2: Miscellaneous
		orArray.add(new BasicDBObject("type", 3));	// 2: Miscellaneous
		
		query.put("$or", orArray);
		
		// 3. Get Rows From DB, Order By dateNumb and then id 
		JSONObject arraysOfObjects = new JSONObject();
		DBCursor cursor = collection.find(query).sort(new BasicDBObject("dateNumb",1).append("_id",1)) ;
		while (cursor.hasNext()) {
			
			// 01. Make One Spending JSON Object 
			DBObject object  = cursor.next();
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("id", object.get("_id"));
			jsonObject.put("year", object.get("year"));
			jsonObject.put("month", object.get("month"));
			jsonObject.put("dateNumb", object.get("dateNumb"));
			jsonObject.put("amount", object.get("amount"));
			jsonObject.put("comment", object.get("comment"));
			
			// 02. Append This Object To The List Of JSON
			arraysOfObjects.append("allSpending", jsonObject);
		}
		
		/** 
		 * where year =? and month = ? and type = 1
		 */
		BasicDBObject foodQuery = new BasicDBObject();
		foodQuery.put("month", Integer.parseInt(month));
		foodQuery.put("year", Integer.parseInt(year));
		foodQuery.put("type", 1);
		cursor = collection.find(foodQuery).sort(new BasicDBObject("_id",1).append("dateNumb",1)) ;
		while (cursor.hasNext()) {
			
			// 01. Make One Spending JSON Object 
			DBObject jsonRow  = cursor.next();

			// 02. Append This Object To The List Of JSON
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("id", jsonRow.get("_id"));
			jsonObject.put("year", jsonRow.get("year"));
			jsonObject.put("month", jsonRow.get("month"));
			jsonObject.put("dateNumb", jsonRow.get("dateNumb"));
			jsonObject.put("amount", jsonRow.get("amount"));
			jsonObject.put("comment", jsonRow.get("comment"));

			arraysOfObjects.append("foodSpending", jsonObject);
		}
		
		
		/** 
		 * where year =? and month = ? and type = 2
		 */
		BasicDBObject miscellaneousSpending = new BasicDBObject();
		miscellaneousSpending.put("month", Integer.parseInt(month));
		miscellaneousSpending.put("year", Integer.parseInt(year));
		miscellaneousSpending.put("type", 2);
		cursor = collection.find(miscellaneousSpending).sort(new BasicDBObject("_id",1).append("dateNumb",1)) ;
		while (cursor.hasNext()) {
			// 01. Make One Spending JSON Object 
			DBObject jsonRow  = cursor.next();
			// 02. Append This Object To The List Of JSON
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("id", jsonRow.get("_id"));
			jsonObject.put("year", jsonRow.get("year"));
			jsonObject.put("month", jsonRow.get("month"));
			jsonObject.put("dateNumb", jsonRow.get("dateNumb"));
			jsonObject.put("amount", jsonRow.get("amount"));
			jsonObject.put("comment", jsonRow.get("comment"));
	
			arraysOfObjects.append("miscellaneousSpending", jsonObject);
		}
		
		
		/** 
		 * where year =? and month = ? and type = 3
		 */
		BasicDBObject fixedSpending = new BasicDBObject();
		fixedSpending.put("month", Integer.parseInt(month));
		fixedSpending.put("year", Integer.parseInt(year));
		fixedSpending.put("type", 3);
		cursor = collection.find(fixedSpending).sort(new BasicDBObject("_id",1).append("dateNumb",1)) ;
		while (cursor.hasNext()) {
			// 01. Make One Spending JSON Object 
			DBObject jsonRow  = cursor.next();
			// 02. Append This Object To The List Of JSON
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("id", jsonRow.get("_id"));
			jsonObject.put("year", jsonRow.get("year"));
			jsonObject.put("month", jsonRow.get("month"));
			jsonObject.put("dateNumb", jsonRow.get("dateNumb"));
			jsonObject.put("amount", jsonRow.get("amount"));
			jsonObject.put("comment", jsonRow.get("comment"));
	
			arraysOfObjects.append("fixedSpending", jsonObject);
		}
		
		
		return arraysOfObjects;
	}
	
	public String addOneBill(String amount, String comment, String year,String month, String date, int type)  {

		BasicDBObject query = new BasicDBObject();
		
		// 1. Set Where Statement
		query.put("amount", Double.parseDouble(amount));
		query.put("comment", comment);

		query.put("year", Integer.parseInt(year));
		query.put("month", Integer.parseInt(month));
		query.put("dateNumb", Integer.parseInt(date));
		
		query.put("type", type);	// 1: Groceries	2: Miscellaneous 
		
		collection.insert(query);

		return "ok";
	}
	
	public String completeOneEntry(String entryID  )  {
		
		// 1. Set Where Statement
		BasicDBObject oldDocument = new BasicDBObject();
		oldDocument.put("_id", new ObjectId(entryID) );
	 
		// 2. make the new entry
		BasicDBObject newDocument = new BasicDBObject();
		newDocument.put("status", "completed");
	 
		// 3. make the object that does the update
		BasicDBObject updateObj = new BasicDBObject();
		updateObj.put("$set", newDocument);
		collection.update(oldDocument, updateObj);

		return "ok";
	}
	
	public DBObject getEntryByID(String entryID) {

		BasicDBObject query = new BasicDBObject();
		DBObject dbObject = null;

		// 1. Set Where Statement
		query.put("_id", new ObjectId(entryID) );

		// 2. Get The Row From DB
		DBCursor cursor = collection.find(query);
		if (cursor.hasNext()) 
			dbObject = cursor.next();

		return dbObject;
	}
	
	public String updateEntry(String entryID, String amount, String comment, String year, String month, String date, int type) {

		// 1. get the old entry 
		BasicDBObject oldDocument = new BasicDBObject();
		oldDocument.put("_id", new ObjectId(entryID) );
	 
		// 2. make the new entry
		BasicDBObject newDocument = new BasicDBObject();
		
		newDocument.put("amount", Double.parseDouble(amount));
		newDocument.put("comment", comment);

		newDocument.put("year", Integer.parseInt(year));
		newDocument.put("month", Integer.parseInt(month));
		newDocument.put("dateNumb", Integer.parseInt(date));
		newDocument.put("type", type);
	 
		// 3. make the object that does the update
		BasicDBObject updateObj = new BasicDBObject();
		updateObj.put("$set", newDocument);
		collection.update(oldDocument, updateObj); // update one
		
		return "ok";
	}

	public String removeOneEntry(String entryIdToRemove) {

		BasicDBObject query = new BasicDBObject();
		query.put("_id", new ObjectId(entryIdToRemove) );
		collection.remove(query);
		
		return "ok";
	}
	
	public String getMonthlyTotals(String year) {

		// 1. Select month, amount
		DBObject fields = new BasicDBObject("month", 1);
		fields.put("amount", 1);
		DBObject project = new BasicDBObject("$project", fields);

		// 2. Where year = 2014 and type = 1, or type = 2, or type = 3
		DBObject where1 = new BasicDBObject("$match", new BasicDBObject("year", Integer.parseInt(year)));

//		ArrayList<BasicDBObject> orArray = new ArrayList<BasicDBObject>();
//		orArray.add(new BasicDBObject("type", 1));
//		orArray.add(new BasicDBObject("type", 2));
//		orArray.add(new BasicDBObject("type", 3));
//		
//		DBObject where2 = new BasicDBObject("$match", new BasicDBObject("$or", orArray));

		// 3. Group by month
		DBObject groupFields = new BasicDBObject("sum", new BasicDBObject("$sum", "$amount")); // sum (amount)
		groupFields.put("_id", "$month"); // Group by month
		DBObject group = new BasicDBObject("$group", groupFields);

		// 4. Sort by month
		DBObject sort = new BasicDBObject("$sort", new BasicDBObject("_id", 1));

		// 5. Aggregate Those Commands
		AggregationOutput output = collection.aggregate(where1, project, group, sort);
		System.out.println("data:\n" + output.results());
		
		// 6. Format To JSON Array
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("sums", output.results());
		
		
		return jsonObject.toString();
	}
	
	
}
