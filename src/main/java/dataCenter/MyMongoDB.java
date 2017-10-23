package dataCenter;

/**
 *  Library: 
 *  
 *  	<dependency>
			<groupId>org.mongodb</groupId>
			<artifactId>mongo-java-driver</artifactId>
			<version>3.0.3</version>
		</dependency>
 * 
 *  Remote DB Console: https://mongolab.com/databases/kennyfang
 * */

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

/**
 * 
 * Database Connection For The Rest of The Queries
 * 
 * Note: The Instance Of This Connection Is Shared In The Server Session
 * 
 * @author Kenny Fang
 * 
 * */
public class MyMongoDB {

	private DB db;
	MongoClient mongoClient;

	@SuppressWarnings("deprecation")
	public MyMongoDB() {

		String urlString = "mongodb://kfang:123@ds053469.mongolab.com:53469/kennyfang";
		MongoClientURI uri = new MongoClientURI(urlString);
		this.mongoClient = new MongoClient(uri);

		// Name of The Database
		this.db = mongoClient.getDB("kennyfang");
	}

	public DB getDBconnection() {
		return db;
	}
	
	public void close() {
		mongoClient.close();
	}

}
