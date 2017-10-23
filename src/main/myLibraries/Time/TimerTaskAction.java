package Time;

import java.util.Calendar;
import java.util.Timer;
import java.util.TimerTask;

public class TimerTaskAction extends TimerTask {

	public void run() {
		System.out.println("Get Up");
	}

	public static void main(String[] args) {

		// 1. Construct TimerTask Action
		TimerTask timerTaskAction = new TimerTaskAction();

		// 2. Define The First Time To Run It
		Calendar firstTime = Calendar.getInstance();
		firstTime.set(2013, 8 - 1, 28, 14, 45);

		// 3. Define The Run Period
		long runEveryMilliseconds = 1000 * 60 * 24;
		runEveryMilliseconds = 1000;

		Timer timer = new Timer();
		timer.scheduleAtFixedRate(timerTaskAction, firstTime.getTime(),runEveryMilliseconds);
	}
}
