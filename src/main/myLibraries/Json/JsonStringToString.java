package Json;

import org.json.JSONException;
import org.json.JSONObject;

public class JsonStringToString {

	public static void main(String[] args) throws JSONException {

		String jsonString = " { \"name\" : \"Lebron\", \"age\" : \"100\", \"nickName\":[\"King James\",\"The King\"] }";

		JSONObject jsonObject = new JSONObject(jsonString); 

		System.out.println(jsonObject.get("name"));
		System.out.println(jsonObject.getJSONArray("nickName").get(1));

	}

}
