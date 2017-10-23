package String;

public class SplitApp {
	public static void main(String[] args) {

		String message = "Kuinai;James;Jordan;Wade";

		String info[] = message.split(";");

		System.out.println(info[0]);
		System.out.println(info[1]);
		System.out.println(info[2]);
		System.out.println(info[3]);
		System.out.println(info.length);

	}

}
