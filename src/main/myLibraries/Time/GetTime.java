package Time;

import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class GetTime {
	
	@SuppressWarnings({ "deprecation" })
	public static void main(String[] args) throws ParseException {
		
		/** Option 1: Date*/
//		Calendar date = new GregorianCalendar(2012, 9, 5);
		Calendar calendar = new GregorianCalendar();
		int year = calendar.get(Calendar.YEAR);  // 2012
		int month = calendar.get(Calendar.MONTH);  // 9 - October!!!
		int day = calendar.get(Calendar.DAY_OF_MONTH);  // 5
		
		System.out.println(calendar.getTime());

		System.out.println("year: " + year);
		System.out.println("month: " + month);
		System.out.println("date: " + day);
		

		/** Option 2: Get Current Time By Calendar */
		System.out.println("\nOption 2: ");
		Calendar currentTime = Calendar.getInstance();
		System.out.println("Current Calendar: \t" + currentTime.getTime());
		System.out.println("Current Year: \t" + currentTime.get(Calendar.YEAR));
		System.out.println("Current Month: \t" + currentTime.getTime().getMonth());
		System.out.println("Current Date: \t" + currentTime.getTime().getDate());
		System.out.println("Current Hour: \t" + currentTime.getTime().getHours());
		System.out.println("Current Minute: " + currentTime.getTime().getMinutes() + "\n");
		
		System.out.println("Week Number: \t" + currentTime.get(Calendar.WEEK_OF_YEAR));
		System.out.println("Day Number: \t" + currentTime.get(Calendar.DAY_OF_YEAR));
		System.out.println("Date Number: \t" + currentTime.get(Calendar.DAY_OF_WEEK));
		
		System.out.println("Location: " + currentTime.getTimeZone().getID() + "\n");

		// String Time 
		String time = currentTime.getTime().toString();
		System.out.println("String Time: " + time);

		String spcificTime[] = time.split(" ");
		System.out.println("specific time: " + spcificTime[3] + "\n");

		/** Other Options */
		Calendar now = new GregorianCalendar();
		System.out.println("By GregorianCalendar(): " + now.getTime());
		System.out.println("By GregorianCalendar(): " + now );

	}
}