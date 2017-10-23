package Thread;

public class ImplementThread implements Runnable {

	private int numberOfLoop;

	public ImplementThread(int numberOfLoop) {

		this.numberOfLoop = numberOfLoop;

	}

	public void run() {

		System.out.println(Thread.currentThread().getName());

		for (int i = 0; i < this.numberOfLoop; i++) {

			System.out.println(Thread.currentThread().getName());

			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}

		}

		System.out.println(Thread.currentThread().getName() + " Done.");
	}

	public static void main(String[] args) {

		Thread thread1 = new Thread(new ImplementThread(10), "FirstThread");
		Thread thread2 = new Thread(new ImplementThread(20), "SecondThread");

		try {

			// Finish first Thread,Then Run Second Thread
			thread1.start();
			thread1.join();
			thread2.start();

		} catch (InterruptedException e) {
			e.printStackTrace();
		}

	}
}