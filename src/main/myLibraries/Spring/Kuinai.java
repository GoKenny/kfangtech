package Spring;

public class Kuinai implements People {

	private String name;
	private int age;

	// 1. Must Make Set Method For Spring To Inject Values
	public void setName(String name) {
		this.name = name;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public void saySomething() {
		
		System.out.println("I'm " + name + ", " + age + " years old.");
		
	}

}
