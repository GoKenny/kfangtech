package Property;

public class People {

	public String name;
	public String age;

	public void setNameAndAgeThroughProperty() {

		// java -cp JarName Packagename.mainClassName -Dname=Kuinai -Dage=28
		this.name = System.getProperty("name");
		this.age = System.getProperty("age");

	}

	public void doSomethingSecondTime() {

		// java -cp JarName Packagename.mainClassName -Dname=Kuinai -Dage=28
		this.name = System.getProperty("name");
		this.age = System.getProperty("age");

	}

}
