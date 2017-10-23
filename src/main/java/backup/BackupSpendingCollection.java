package backup;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
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

public class BackupSpendingCollection {

	public static void main(String[] args) throws IOException, InterruptedException {

		/** Get The List Of JSON From The Collection in MongoDB */
		// Point To The Source Collection
		DBCollection sourceCollection = new MyMongoDB().getDBconnection().getCollection("MySpendingsDemo");

		// 1. Select * (exclude _id)
		BasicDBObject selectObject = new BasicDBObject();
		selectObject.put("_id", 0);

		// 2. Where year = 2014
		BasicDBObject queryingObject = new BasicDBObject();
//		 queryingObject.put("year", 2015);

		// 3. Run The Query, Order By dateNumb and startTime
		DBCursor cursor = sourceCollection.find(queryingObject, selectObject).sort(new BasicDBObject("year", 1).append("month", 1).append("dateNumb", 1));
		List<DBObject> listOfSpendings = cursor.toArray();

		/***************************************** Save To File ******************************************************************/
		PrintWriter printWriter = new PrintWriter(new BufferedWriter(new FileWriter("src/main/java/backup/Spending.dbe")));

		for (DBObject spending : listOfSpendings) {
			System.out.println(spending);
			printWriter.write(spending.toString() + "\n");
		}

		printWriter.close();

		/**************************************** Insert The Data Into Target Collection ******************************************************/
//		 DBCollection targetCollection = new MyMongoDB().getDBconnection().getCollection("MySpendingsDemo");
//		 
//		 for (DBObject spending : listOfSpendings) {
//			 
//			 spending.put("year", 2016);
//			
//			 targetCollection.insert(spending);
//			 System.out.println(spending);
//		}

		System.out.println("rows: " + listOfSpendings.size());
		System.out.println("Done");

	}

}
