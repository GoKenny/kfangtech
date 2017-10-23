package General;

public class args {

	public static void main(String[] args) {

		//java -cp JarName MainClassName 123 456 789
		for (int i = 0; i < args.length; i++) {
			System.out.println(args[i]);
		}
		
		if(args[1].equals("456"))
			System.out.println("Yes");
	}

}
