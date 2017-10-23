package JDBC.MongoDB;
/** 
 * Library: mongo-2.10.1.jar 
 * 
 * Or Maven
 * 	<dependency>
		<groupId>org.mongodb</groupId>
		<artifactId>mongo-java-driver</artifactId>
		<version>2.10.1</version>
	</dependency>
 * 
 * 
 * */
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.List;

import com.mongodb.AggregationOutput;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class MongoDBapp {
	
	public static void main(String[] args) throws UnknownHostException {
		
		// 1. connect to the remote MongoDB */
		String urlString = "mongodb://kfang:123@ds053469.mongolab.com:53469/kennyfang";
		MongoClientURI uri = new MongoClientURI(urlString);
		
		MongoClient mongo = new MongoClient(uri);
		DB db = mongo.getDB("kennyfang");							// Name of DB
		
		// 2. Query
		DBCollection table = db.getCollection("MyActivitiesDemo");		// Name of Collection or Table
		BasicDBObject query = new BasicDBObject();
		
		/** Option 1: Insert A Document or Row */
		query.put("year", 2016);
		query.put("month", 8);
		query.put("dateNumb", 1);
		query.put("startTime", 0);
		query.append("endTime", 0);
		query.append("place", "to be deleted");
		query.append("activity", "to be deleted");
		query.append("status", "pending");
		
		query.put("address", new BasicDBObject("city","Fredericton").append("province", "NB").append("postCode", "E3B4G3"));
		
		for (int i = 0; i < 5; i++) {
			
			query.put("_id", null);
			table.insert(query);
			System.out.println(query);
		}
		System.out.println("done");
		
		/** Option 2: Select All entries where "activity"="to be deleted" */
//		query.put("activity", "Completed"); 
//		query.put("year", new BasicDBObject("$gt", 2014)); // year >1, $lt, $in, $ne
		
//		DBCursor cursor = table.find(query);
//		DBCursor cursor = table.find(query).sort(new BasicDBObject("year",-1).append("month",-1)  ).limit(10);	// 1 ascend, -1 descend
//		
//		System.out.println(cursor.toArray());
		
//		while (cursor.hasNext()){
//			
//			DBObject JSonObjectrow = cursor.next();
//			System.out.println(JSonObjectrow); // row.get("_id"), row.get("year")
//		}
		
		/** Option 3: Update ONE Document Where "activity" = "to be deleted" */
		// 1. get the old entry 
//		BasicDBObject oldDocument = new BasicDBObject();
//		oldDocument.put("status", "completed");
//		oldDocument.put("_id", new ObjectId("53d9436024f12ae1fd2740ae") );
//	 
//		// 2. make the new entry
//		BasicDBObject newDocument = new BasicDBObject();
//		newDocument.put("status", "pending");
//	 
//		// 3. make the object that does the update
//		BasicDBObject updateObj = new BasicDBObject();
//		updateObj.put("$set", newDocument);
//		table.update(oldDocument, updateObj); // update one
////		table.update(oldDocument, updateObj,true,true); //update all
//		
		/** Option 4: Delete all document where "activity" = "to be deleted"*/
//		query.put("activity", "to be deleted");
//		query.put("_id", new ObjectId("53d9436024f12ae1fd2740ae") );
//		table.remove(query);
	
		
		/** Option 5: Group By"*/
//		// 1. count (id) group by month
//		DBObject groupFields = new BasicDBObject( "_id", "$month");
//	    groupFields.put("count", new BasicDBObject( "$sum", 1));
//	    DBObject group = new BasicDBObject("$group", groupFields );
//
//	    // 2. Sort by count
//	    DBObject sortBy = new BasicDBObject("$sort", new BasicDBObject("count", -1));
//	    
//	    // 3. Aggregate The Query For Output
//	    AggregationOutput output = table.aggregate(group, sortBy);
//	    System.out.println( output.getCommandResult().get("result") );
		
		/** MySpendings */
//		table = db.getCollection("MySpendings");
		
//		// 1. Select month, amount from MySpendings
//		DBObject fields = new BasicDBObject("month", 1);
//		fields.put("amount", 1); 
//		DBObject project = new BasicDBObject("$project", fields);
//
//		// 2. Where year = 2014
//		DBObject where = new BasicDBObject("$match", new BasicDBObject("year", 2014));
//
//		// 3. Group by month
//		DBObject groupFields = new BasicDBObject("sum", new BasicDBObject( "$sum", "$amount")); //	sum (amount)
//		groupFields.put( "_id", "$month");	 // Group by month
//		DBObject group = new BasicDBObject("$group", groupFields);
//
//		// 4. Sort by amount
//		DBObject sort = new BasicDBObject("$sort", new BasicDBObject("_id", 1));
//		
//		// 5. Aggregate Those Commands
//		List<DBObject> pipeline = Arrays.asList(where, project, group, sort);
//		AggregationOutput output = table.aggregate(pipeline);
//		
//		System.out.println(output.results());
		
		mongo.close();
	}

}
