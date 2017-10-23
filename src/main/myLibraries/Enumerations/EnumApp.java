package Enumerations;

public class EnumApp {

	public static void main(String[] args) {

		String name;
		name = People.TeamA.Number9.getName();
		System.out.println(name);
		
		System.out.println(Numbers.one);
		
		/** Fruits */
		System.out.println(Fruits.Banana);
		System.out.println(Fruits.Banana.ordinal());

	}

}
