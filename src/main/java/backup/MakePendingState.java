package backup;

import java.net.UnknownHostException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

/**
 * 
 * Make The Entries As Pending For Demo
 * 
 * Make All Status to "pending" where year = 2014
 * 
 * */

public class MakePendingState {

	public static void main(String[] args) throws UnknownHostException {

		/** 1. Data Base Connection */
		String urlString = "mongodb://kfang:123@ds053469.mongolab.com:53469/kennyfang";
		MongoClientURI uri = new MongoClientURI(urlString);
		MongoClient mongo = new MongoClient(uri);
		DB db = mongo.getDB("kennyfang"); // Name of DB
		DBCollection table = db.getCollection("MyActivitiesDemo"); // Name of Collection or Table

		/** 2. Update All Document Where "year" = 2014 to "pending" status */
		// 1. Where year = 2014
		BasicDBObject where = new BasicDBObject();
		where.append("year", 2014);

		// 2. Set status = "pending"
		BasicDBObject updateQuery = new BasicDBObject();
		updateQuery.append("$set", new BasicDBObject().append("status", "pending"));

		table.updateMulti(where, updateQuery);

		System.out.println("Done");

		/** 2. Update ONE Document Where "activity" = "to be deleted" */
		// BasicDBObject query = new BasicDBObject();

		// 1. get the old entry
		// BasicDBObject oldDocument = new BasicDBObject();
		// oldDocument.put("status", "completed");
		// oldDocument.put("year", 2014);
		// oldDocument.put("_id", new ObjectId("53d9436024f12ae1fd2740ae") );

		// 2. make the new entry
		// BasicDBObject newDocument = new BasicDBObject();
		// newDocument.put("status", "pending");

		// 3. make the object that does the update
		// BasicDBObject updateObj = new BasicDBObject();
		// updateObj.put("$set", newDocument);
		// table.update(oldDocument, updateObj); // update one
		// table.update(oldDocument, updateObj,true,true); //update all

	}

}
