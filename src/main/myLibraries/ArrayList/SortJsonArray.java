package ArrayList;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.json.JSONObject;

public class SortJsonArray {

	public static void main(String[] args) {

		List<JSONObject> jsonArray = new ArrayList<JSONObject>();

		for (int i = 0; i < 5; i++) {

			// 1. Make The JSON
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("id", i);
			jsonObject.put("age", new Random().nextInt(100));
			jsonObject.put("rank", new Random().nextInt(100));
			jsonObject.put("name", UUID.randomUUID().toString());

			// 2. Add This JSON To The Array
			jsonArray.add(jsonObject);
		}

		/****** Sort By Integer *******/
		System.out.println("Sort By Age: \n-------------------------------------------");
		Collections.sort(jsonArray, new Comparator<JSONObject>() {
			public int compare(JSONObject p1, JSONObject p2) {
				return p1.getInt("age") - p2.getInt("age");
			}
		});

		for (JSONObject jsonObject : jsonArray)
			System.out.println(jsonObject);

		/****** Sort By String *******/
		System.out.println("\nSort By Name: \n-------------------------------------------");
		Collections.sort(jsonArray, new Comparator<JSONObject>() {
			public int compare(JSONObject p1, JSONObject p2) {
				return (p1.getString(("name")).compareTo(p2.getString("name")));
			}
		});

		for (JSONObject jsonObject : jsonArray)
			System.out.println(jsonObject);

	}

}
