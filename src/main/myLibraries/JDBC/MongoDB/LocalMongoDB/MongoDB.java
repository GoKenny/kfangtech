package JDBC.MongoDB.LocalMongoDB;


import java.net.UnknownHostException;
import java.util.Arrays;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

/**
 * Database Connection For The Rest of The Queries
 * 
 * Reference: http://docs.mongodb.org/ecosystem/tutorial/getting-started-with-java-driver/
 * 
 * Note: The Instance Of This Connection Is Shared In The Server Session Or Property in Memory
 * 
 * @author Kenny Fang
 * 
 * */
public class MongoDB {

	private DB db;

	public MongoDB() throws UnknownHostException {
		
		// 1. Connect To The DB
		MongoCredential credential = MongoCredential.createMongoCRCredential("KennyFang", "EyesOverCache", "123".toCharArray());
		MongoClient mongoClient = new MongoClient(new ServerAddress("localhost", 27017), Arrays.asList(credential));
		db = mongoClient.getDB("EyesOverCache");

	}

	public void showKennyCollection() {

		// 2. Point To The Collections
		DBCollection collection = this.db.getCollection("Kenny");

		// 3. Do The Queries
		BasicDBObject queryObject = new BasicDBObject();

		DBCursor cursor = collection.find(queryObject);
		while (cursor.hasNext()) {

			DBObject JSonObjectrow = cursor.next();
			System.out.println(JSonObjectrow);
		}
	}

	public DB getDBconnection() {
		return db;
	}

	public static void main(String args[]) throws UnknownHostException {

		MongoDB mongoDB = new MongoDB();
		mongoDB.showKennyCollection();

	}

}

