package General;

public class ClassLocation {
	public static void main(String[] args) {
		
		ClassLocation myClassLocation = new ClassLocation();
		System.out.println(myClassLocation.getClass().getProtectionDomain().getCodeSource().getLocation().getPath());
	
	}

}