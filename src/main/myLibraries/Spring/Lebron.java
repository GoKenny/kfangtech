package Spring;

@SuppressWarnings("unused")
public class Lebron implements People {

	private String name;
	private int age;
	private Kuinai student;

	public void saySomething() {

		System.out.println("I'm " + name + ", " + age + " years old.");

	}

	// Must Make Set Method For Spring To Inject Values
	public void setName(String name) {
		this.name = name;
	}

	public void setAge(int age) {
		this.age = age;
	}

}
