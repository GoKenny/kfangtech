package General;

public class Memory {

	public static void main(String[] args) {

		long freeMemory;
		long totalMemory;

//		 System.gc();
//		 Runtime.getRuntime().gc();

		freeMemory = Runtime.getRuntime().freeMemory();
		totalMemory = Runtime.getRuntime().totalMemory();

		System.out.println("Free Memory = " + freeMemory);
		System.out.println();
		System.out.println("Total Memory = " + totalMemory);
		System.out.println();
		System.out.println("Processors: " + Runtime.getRuntime().availableProcessors());

	}

}
