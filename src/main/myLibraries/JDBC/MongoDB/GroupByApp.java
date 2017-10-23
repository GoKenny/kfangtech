package JDBC.MongoDB;

import java.net.UnknownHostException;

import org.json.JSONObject;

import com.mongodb.AggregationOutput;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;

public class GroupByApp {

	public static void main(String[] args) throws UnknownHostException {

		// 1. connect to the remote MongoDB */
		String urlString = "mongodb://kfang:123@ds053469.mongolab.com:53469/kennyfang";
		MongoClientURI uri = new MongoClientURI(urlString);
		MongoClient mongo = new MongoClient(uri);
		DB db = mongo.getDB("kennyfang"); // Name of DB
		DBCollection table = db.getCollection("MySpendings"); // Name of Collection or Table

		/** MySpendings */
		// 1. Select month, amount
		DBObject fields = new BasicDBObject("month", 1);
		fields.put("amount", 1);
		DBObject project = new BasicDBObject("$project", fields);

		// 2. Where year = 2014 and type = 1
		DBObject where1 = new BasicDBObject("$match", new BasicDBObject("year", 2013));
		DBObject where2 = new BasicDBObject("$match", new BasicDBObject("type", 1));

		// 3. Group by month
		DBObject groupFields = new BasicDBObject("sum", new BasicDBObject("$sum", "$amount")); // sum (amount)
		groupFields.put("_id", "$month"); // Group by month
		DBObject group = new BasicDBObject("$group", groupFields);

		// 4. Sort by month
		DBObject sort = new BasicDBObject("$sort", new BasicDBObject("_id", 1));

		// 5. Aggregate Those Commands
		AggregationOutput output = table.aggregate(where1, where2, project, group, sort);

		// 6. Get The Results
		System.out.println(output.results());

		// 7. Format To JSON
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("sums", output.results());
		
		System.out.println();
		System.out.println(jsonObject);

	}

}
