package Time;

import java.util.Calendar;
import java.util.GregorianCalendar;

public class CalculteDate {
	
	public static void main(String[] args) {
		
		Calendar now = new GregorianCalendar();
		System.out.println("Now: \t\t" + now.getTime());
		
		now.add(Calendar.WEEK_OF_YEAR, -1);
		now.set(Calendar.DAY_OF_WEEK, 1);
		
		System.out.println("LastWeek:\t" + now.getTime());
		System.out.println("Current Year: \t" + now.get(Calendar.YEAR));
		
	}

}
