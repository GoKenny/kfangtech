package Thread;

// Or Can Use Implement Runnable
public class People extends Thread {

	private String name;
	private int waitTime;

	public People(String name, int waitTime) {
		this.name = name;
		this.waitTime = waitTime;
	}

	public void saySomethine() {

		try {
			Thread.sleep(waitTime);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		System.out.println(name);
	}

	@Override
	public void run() {

		try {
			Thread.sleep(waitTime);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		System.out.println(name);
	}
}
