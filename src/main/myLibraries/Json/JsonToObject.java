package Json;

import com.google.gson.Gson;

public class JsonToObject {

	public static void main(String[] args) {

		String json = "{\"name\":\"Kuinai\",\"address\":\"Windsor\"}";

		Gson gson = new Gson();
		Student student = gson.fromJson(json, Student.class);

		System.out.println(student.getName());
		System.out.println(student.getAddress());

	}

}
