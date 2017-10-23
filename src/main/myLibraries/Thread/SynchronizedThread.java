package Thread;

public class SynchronizedThread extends Thread {

	public void run() {

		sayThreadName();
		sayThreadName();

	}

	// cannot execute this method at the same time.
	private static synchronized void sayThreadName() {

		System.out.println(Thread.currentThread().getName());

		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

	}

	public static void main(String[] args) {

		SynchronizedThread thread0 = new SynchronizedThread();
		SynchronizedThread thread1 = new SynchronizedThread();

		// Start 2 Threads At The Same Time
		thread0.start();
		thread1.start();

	}
}

// // Set thread priority, the normal priority of a thread is 5.
// thread0.setPriority(1);
// thread1.setPriority(2);