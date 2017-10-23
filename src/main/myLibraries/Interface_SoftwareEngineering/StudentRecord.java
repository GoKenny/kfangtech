package Interface_SoftwareEngineering;

public class StudentRecord {
	private String name;
	private int grade;

	public StudentRecord(String name, int grade) {
		this.name = name;
		this.grade = grade;
	}

	public int getKey() {
		return this.grade;
	}

	public String toString() {
		String message;
		message = "Name: " + name;
		message += "\tGrade: " + grade;

		return message;
	}
}