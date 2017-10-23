package _Testing_;

import java.util.Calendar;
import java.util.GregorianCalendar;

public class Time {

	public static void main(String[] args) {

		// Calendar date = new GregorianCalendar(2012, 9, 5);
		Calendar date = new GregorianCalendar();
		
		int year = date.get(Calendar.YEAR); 
		int month = date.get(Calendar.MONTH);
		int day = date.get(Calendar.DAY_OF_MONTH);

		System.out.println(date.getTime());

		System.out.println("year: " + year);
		System.out.println("month: " + month);
		System.out.println("date: " + day);
		
		String monthName;
		Time time = new Time();
		monthName = time.toMonthName(month);
		System.out.println("The Month Name: " + monthName);

	}
	
	
	public String toMonthName(int month){
	    String[] monthNames = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};
	    return monthNames[month];
	}

}
