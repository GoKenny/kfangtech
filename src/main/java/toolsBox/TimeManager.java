package toolsBox;

import java.util.Calendar;

public class TimeManager {

	private String specificTime[];

	public TimeManager() {

		Calendar currentTime = Calendar.getInstance();

		this.specificTime = currentTime.getTime().toString().split(" ");

	}

	public String getCurrentMonth() {

		String month = specificTime[1];

		if (month.equals("Jun"))
			return "6";

		if (month.equals("Jul"))
			return month = "7";

		if (month.equals("Aug"))
			return month = "8";

		if (month.equals("Sep"))
			return month = "9";

		if (month.equals("Oct"))
			return month = "10";

		if (month.equals("Nov"))
			return month = "11";

		if (month.equals("Dec"))
			return month = "12";

		if (month.equals("Jan"))
			return month = "1";

		if (month.equals("Feb"))
			return month = "2";

		if (month.equals("Mar"))
			return month = "3";

		if (month.equals("Apr"))
			return month = "4";

		if (month.equals("May"))
			return month = "5";

		return month;

	}

	public String getCurrentDate() {
		return specificTime[2];
	}

	public String getCurrentYear() {
		return specificTime[5];
	}

	@SuppressWarnings("static-access")
	public int getWeekNumb(String year, String month, String date) {

		Calendar time = Calendar.getInstance();

		// Pointing To 1 Month Less
		time.set(Integer.valueOf(year), Integer.valueOf(month) - 1, Integer.valueOf(date));
		time.setFirstDayOfWeek(1);

		return time.get(time.WEEK_OF_YEAR);

	}

	public String getDayOfWeek(String year, String month, String date) {

		Calendar time = Calendar.getInstance();

		// Pointing To 1 Month Less
		time.set(Integer.valueOf(year), Integer.valueOf(month) - 1, Integer.valueOf(date));

		return time.getTime().toString().split(" ")[0];

	}

	public String getNow() {

		StringTransformer st = new StringTransformer();
		st.formatDay(specificTime[0]);

		return st.formatDay(specificTime[0]) + ",&nbsp " + specificTime[1] + " " + specificTime[2] + " " + specificTime[3];

	}

	public String getCurrentTime() {

		return getCurrentYear() + "/" + getCurrentMonth() + "/" + getCurrentDate() + "-" + specificTime[3];
	}

	public static void main(String[] args) {

		TimeManager timeManager = new TimeManager();

		System.out.println("currentMonth: " + timeManager.getCurrentMonth());
		System.out.println("currentYear: " + timeManager.getCurrentYear());

		System.out.println(timeManager.getCurrentTime());

	}

}
