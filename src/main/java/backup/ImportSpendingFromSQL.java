package backup;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

/**
 * 
 * Export The Data From SQL Script Backup
 * 
 * */

public class ImportSpendingFromSQL {

	public static void main(String[] args) throws IOException, InterruptedException {

		// 1. Initiate The File
		File file = new File("src/main/resources/Backup Scripts/InsertSpending");
		BufferedReader read = new BufferedReader(new FileReader(file));

		String information;
		while ((information = read.readLine()) != null) {

			// 2. Initiate The MongoDB (Not Able to Insert Multiple Documents With One Connection, So It Has To Be In The Loop)
			String urlString = "mongodb://kfang:123@ds053469.mongolab.com:53469/kennyfang";
			MongoClientURI uri = new MongoClientURI(urlString);
			MongoClient mongo = new MongoClient(uri);
			DB db = mongo.getDB("kennyfang");

			DBCollection table = db.getCollection("MySpendingsDemo"); // Name of Collection or Table
			BasicDBObject query = new BasicDBObject();

			/** 1. Read The SQL File */
			// 1. Get The Insert Values At The End
			String insertValues = information.substring(80);

			// 2. Extract The Desired Data
			String data[] = insertValues.split(",");
			String sqlYear = data[1];
			String sqlMonth = data[2];
			String sqlDateNumb = data[3];

			String sqlAmount = data[4];

			String sqlComment = data[5];
			if (sqlComment.equals("null"))
				sqlComment = "";
			else
				sqlComment = sqlComment.substring(1, sqlComment.length() - 1); // remove the ''

			String sqlType = data[6];
			sqlType = sqlType.substring(0, sqlType.length() - 2); // remove the ); at the end

			// Testing The Data
			System.out.print(insertValues);

			System.out.print(insertValues + "          ");
			System.out.print("sqlYear: " + sqlYear + "  ");
			System.out.print("sqlMonth: " + sqlMonth + "  ");
			System.out.print("sqlDateNumb: " + sqlDateNumb + "  ");

			System.out.print("sqlAmount: " + sqlAmount + "  ");
			System.out.print("sqlComment: " + sqlComment + "  ");
			System.out.print("sqlType: " + sqlType + "  ");

			System.out.println();

			/** 2. Prepare The List of DBObject For Insert */
//			 query.put("year", Integer.parseInt(sqlYear));
			query.put("year", 2014);
			query.put("month", Integer.parseInt(sqlMonth));
			query.put("dateNumb", Integer.parseInt(sqlDateNumb));

			query.put("amount", Double.parseDouble(sqlAmount));
			query.put("comment", sqlComment);

			query.append("type", Integer.parseInt(sqlType));

			/** 3. Insert Those Documents (Rows) To MongoDB */
			table.insert(query);
		}

		read.close();

	}

}
