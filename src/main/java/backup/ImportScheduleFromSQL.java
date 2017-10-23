package backup;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

/**
 * 
 * Export The Data From SQL Script Backup
 * 
 * */

public class ImportScheduleFromSQL {

	public static void main(String[] args) throws IOException, InterruptedException {

		// 1. Initiate The File
		File file = new File("src/main/resources/Backup Scripts/InsertMemo");
		BufferedReader read = new BufferedReader(new FileReader(file));


		String information;
		while ((information = read.readLine()) != null) {
			
			// 2. Initiate The MongoDB	(Not Able to Insert Multiple Documents With One Connection, So It Has To Be In The Loop)
			String urlString = "mongodb://kfang:123@ds053469.mongolab.com:53469/kennyfang";
			MongoClientURI uri = new MongoClientURI(urlString);
			MongoClient mongo = new MongoClient(uri);
			DB db = mongo.getDB("kennyfang");
			
			DBCollection table = db.getCollection("MyActivities"); // Name of Collection or Table
			BasicDBObject query = new BasicDBObject();
			
			// 3.Prepare The List of DBObject For Insert (cannot insert one by one inside the while loop)
			List<DBObject> documents = new ArrayList<DBObject>();

			/** 1. Read The SQL File */
			// 1. Get The Insert Values At The End
			String insertValues = information.substring(86);

			// 2. Extract The Desired Data
			String data[] = insertValues.split(",");
			String sqlYear = data[1];
			String sqlMonth = data[2];
			String sqlDateNumb = data[3];

			String sqlStartTime = data[4];
			if (sqlStartTime.equals("null"))
				sqlStartTime = "-1";

			String sqlEndTime = data[5];
			if (sqlEndTime.equals("null"))
				sqlEndTime = "-1";

			String sqlPlace = data[6];
			sqlPlace = sqlPlace.substring(1, sqlPlace.length() - 1); // remove the ''

			String sqlEvent = data[7];
			sqlEvent = sqlEvent.substring(1, sqlEvent.length() - 1); // remove the ''

			String sqlStatus = data[8];
			sqlStatus = sqlStatus.substring(0, sqlStatus.length() - 2); // remove the ); at the end
			sqlStatus = sqlStatus.substring(1, sqlStatus.length() - 1); // remove the ''
			sqlStatus = sqlStatus.toLowerCase();

			// Testing The Data
			System.out.print(insertValues + "          ");
			System.out.print("sqlYear: " + sqlYear + "  ");
			System.out.print("sqlMonth: " + sqlMonth + "  ");
			System.out.print("sqlDateNumb: " + sqlDateNumb + "  ");

			System.out.print("sqlStartTime: " + sqlStartTime + "  ");
			System.out.print("sqlEndTime: " + sqlEndTime + "  ");

			System.out.print("sqlPlace: " + sqlPlace + "  ");
			System.out.print("sqlEvent: " + sqlEvent + "  ");

			System.out.print("sqlStatus: " + sqlStatus + "  ");

			System.out.println();

			/** 2. Prepare The List of DBObject For Insert */
			query.put("year", Integer.parseInt(sqlYear));
//			query.put("year", 2014);
			query.put("month", Integer.parseInt(sqlMonth));
			query.put("dateNumb", Integer.parseInt(sqlDateNumb));

			query.put("startTime", Double.parseDouble(sqlStartTime));
			query.append("endTime", Double.parseDouble(sqlEndTime));

			query.append("place", sqlPlace);
			query.append("activity", sqlEvent);
			query.append("status", sqlStatus);

			table.insert(query);
			documents.add(query);
		}

		/** 3. Insert Those Documents (Rows) To MongoDB */
//		table.insert(documents);

		read.close();

	}

}
