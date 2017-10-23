package Json;

import com.google.gson.Gson;

public class GSON {

	public static void main(String[] args) {

		Student student = new Student("Windsor", "Kuinai");

		Gson gson = new Gson();
		String json = gson.toJson(student);
		
		System.out.println(json);
	}
}
