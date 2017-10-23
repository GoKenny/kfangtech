package Thread;

public class ThreadApp {

	public static void main(String[] args) throws InterruptedException {
		
		People kuinai = new People("Kuinai", 2000);
		People lebron = new People("Lebron", 1000);
		
		/** Execute Them One by One" */
		kuinai.saySomethine();
		lebron.saySomethine();
		System.out.println();

		/** Execute Them At The Same Time */	
		kuinai.start();
//		kuinai.join();// Only When Kuinai Finishes, Lebron Can Show Up
		lebron.start();

	}
}
