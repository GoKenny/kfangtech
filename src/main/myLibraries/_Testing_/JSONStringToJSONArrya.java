package _Testing_;

import org.json.JSONException;
import org.json.JSONObject;

public class JSONStringToJSONArrya {
	
	
	public static void main(String[] args) throws JSONException {

		String monthlyTotals = " {\"sums\":[{\"_id\":1,\"sum\":690.8799999999999},{\"_id\":2,\"sum\":170.5},{\"_id\":3,\"sum\":232.69}]}";

		JSONObject jsonObject = new JSONObject(monthlyTotals); 
		
		JSONObject theObject ;
		Double theSum;
		JSONObject theNewArray = new JSONObject();
		
		
		for (int i = 0; i < jsonObject.getJSONArray("sums").length(); i++) {
			
			// 1. Get The Object
			theObject = (JSONObject) jsonObject.getJSONArray("sums").get(i);
			System.out.println("theObject: " + theObject);
			
			// 2. Get The "sum" in This Object
			theSum = theObject.getDouble("sum");
			System.out.println("theSum: " + theSum);
			
			// 3. Append To The New Array
			theNewArray.append("monthTotals", theSum);
		}
		
		System.out.println("theNewArray: " + theNewArray);
	}

}
