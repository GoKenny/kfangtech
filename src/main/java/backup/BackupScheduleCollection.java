package backup;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

import dataCenter.MyMongoDB;

/**
 * 
 * Get All Data And Save To A File
 * 
 * */

public class BackupScheduleCollection {

	public static void main(String[] args) throws IOException, InterruptedException {
		
		/** 1. Get All The Data From MongoDB */
		// 1. Point To The Source Collection
		DBCollection sourceCollection = new MyMongoDB().getDBconnection().getCollection("MyActivitiesDemo");
		
		// 1. Select * (except _id)
		BasicDBObject selectObject = new BasicDBObject();
		selectObject.put("_id", 0);
		
		// 2.  Where year = 2014
		BasicDBObject queryingObject = new BasicDBObject();
		queryingObject.put("year", 2015);

		// 3. Run The Query, Order By year, month, dateNumb, startTime 
		DBCursor cursor = sourceCollection.find(queryingObject,selectObject).sort(new BasicDBObject("year",1).append("month",1).append("dateNumb",1).append("starTime", 1)) ;
		List<DBObject>  jsonArray = cursor.toArray();
		
		/** 
		 * 2. Save To File
		 * */
//		PrintWriter printWriter = new PrintWriter(new BufferedWriter(new FileWriter("src/main/java/backup/Schedule.dbe")));
//		
//		for (DBObject dbObject : jsonArray) {
//			System.out.println(dbObject);
//			printWriter.write(dbObject.toString() + "\n");
//		}
//		
//		printWriter.close();
		

		// 3. Optional For Demo Collection Insert The Data Into Target Collection 
		List<DBObject>  newJsonArray = new ArrayList<DBObject> ();
		
		DBCollection targetCollection = new MyMongoDB().getDBconnection().getCollection("MyActivitiesDemo");
		for (DBObject entry : jsonArray) {
			
			entry.put("year", 2016);
			entry.put("status", "pending");
			
			targetCollection.insert(entry);
			System.out.println(entry);
		}
		
		System.out.println("Numebr of rows: " + jsonArray.size());
		System.out.println("Done ;)");

	}

}
