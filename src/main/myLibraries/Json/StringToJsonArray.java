package Json;

import org.json.JSONException;
import org.json.JSONObject;

public class StringToJsonArray {

	public static void main(String[] args) throws JSONException {

		JSONObject jsonObject = new JSONObject();

		/** Case 1: One Object */
		// Add Property
		jsonObject.put("name", "Lebron");
		jsonObject.put("age", "100");

		// Add Array
		jsonObject.append("nickName", "King James");
		jsonObject.append("nickName", "The King");
		jsonObject.append("nickName", "King");
		System.out.println("Array: \n" + jsonObject + "\n");

		/** Case 2: Arrays Of Objects */
		JSONObject arraysOfObjects = new JSONObject();
		arraysOfObjects.append("rows", jsonObject);
		arraysOfObjects.append("rows", jsonObject);

		System.out.println("Array Of Objects: \n" + arraysOfObjects);
	}

}
