package ArrayList;

import java.util.ArrayList;
import java.util.List;

public class ListApp {

	public static void main(String[] args) {

		/** Can Be String, Integer, Object etc. */
		List<String> stringList = new ArrayList<String>();

		stringList.add("Kuinai");
		stringList.add("James");
		stringList.add("Jordan");
		stringList.add("Wade");

		stringList.set(3, "Kenny");

		for (int i = 0; i < stringList.size(); i++)
			System.out.println(stringList.get(i));

	}
}
