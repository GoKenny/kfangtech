package Map;

import java.util.HashMap;
import java.util.Map;

public class MapApp {

	public static void main(String[] args) {

		Map<String, String> phone = new HashMap<String, String>();

		phone.put("123", "Lebron");
		phone.put("123", "Something");
		phone.put("456", "Kuinai");
		phone.put("789", "Lebron");
		
		Map<String, String> idNameMap;
		idNameMap=phone;

		System.out.println(idNameMap.get("123"));

	}

}
