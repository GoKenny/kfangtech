package Time;

public class Duration {

	public static void main(String[] args) throws InterruptedException {

		long beginTime = System.currentTimeMillis();

		Thread.sleep(1000);

		long duration = System.currentTimeMillis() - beginTime;
		System.out.println("Duration: " + duration);

	}
}
