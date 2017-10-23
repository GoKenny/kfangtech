package Enumerations;

public interface People {

	public static enum TeamA {
		
		// 3. Enumerate Them;
		Number6("Lebron James"), 
		Number9("Kuinai Fang"), 
		Number23("Michael Jordan");

		// 1. Define Data Type To Be Returned
		private String name;

		TeamA(String name) {
			this.name = name;
		}
		
		// 2. Return It
		public String getName(){
			return this.name;
		}
	}
}
