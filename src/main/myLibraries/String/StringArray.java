package String;

public class StringArray {
	public static void main(String[] args) {

		// String Array without specific range
		String appName[];
		String info[] = { "one", "two", "three", "four" };
		appName = info;
		
		// String Array with specific range
		String something[] =new String[30];
		something[29]="yes";

		System.out.println(appName[3]);
		System.out.println(something[29]);

	}
}
