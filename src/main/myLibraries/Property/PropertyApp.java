package Property;

public class PropertyApp {

	public static void main(String[] args) {

		/** get and set properties of a class */
		People people = new People();

		// java -cp JarName Packagename.mainClassName -Dname=Kuinai -Dage=28
		System.setProperty("name", "Kuinai");
		System.setProperty("age", "28");

		people.setNameAndAgeThroughProperty();
		System.out.println(people.name);
		System.out.println(people.age);	
		
		// get Properties 2 times
		people.setNameAndAgeThroughProperty();
		System.setProperty("name", "Fang");
		System.setProperty("age", "30");
		
		System.out.println(people.name);
		System.out.println(people.age);

		/** List Of System Default Properties */
		System.out.println("\n**********\tList of System Properties\t************");
		
		System.out.println("User Name:\t" + System.getProperty("user.name"));
		System.out.println("User Home: \t" + System.getProperty("user.home"));
		System.out.println("User Directory:\t" + System.getProperty("user.dir")+"\n");
		
		System.out.println("OS Name:\t" + System.getProperty("os.name"));
		System.out.println("OS Version:\t" + System.getProperty("os.version"));
		System.out.println("OS Archive:\t" + System.getProperty("os.arch")+"\n");
		
		System.out.println("Java Vendor:\t" + System.getProperty("java.vendor"));
		System.out.println("Java Vendor URL: " + System.getProperty("java.vendor.url"));
		System.out.println("Java Version:\t" + System.getProperty("java.version"));
		System.out.println("Java Home:\t" + System.getProperty("java.home")+"\n");
		
		System.out.println("Path Separator:\t" + System.getProperty("path.separator"));
		System.out.println("File Separator:\t" + System.getProperty("file.separator"));
		System.out.println("Line Separator:\t" + System.getProperty("line.separator"));
		
		String info[]= System.getProperty("java.class.path").split(":");
		for (int i = 0; i < info.length; i++) {
			System.out.println(info[i]);
		}

	}
}
