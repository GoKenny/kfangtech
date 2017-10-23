package Time;

import java.util.Calendar;

public class SetTime {
	
	@SuppressWarnings("static-access")
	public static void main(String[] args) {
		
		// 0 Means January, 1 Means February
		Calendar someTime = Calendar.getInstance();
		someTime.set(2014, 6, 4); 
		someTime.add(Calendar.WEEK_OF_YEAR, -1);
		someTime.add(Calendar.WEEK_OF_YEAR, -1);
		
		System.out.println("The Time Is: " + someTime.getTime());
		System.out.println("The Time Is: " + someTime.getTime().getYear() + "/" + someTime.getTime().getMonth() + "/" + someTime.getTime().getDate());
		System.out.println("Week Number: " + someTime.get(someTime.WEEK_OF_YEAR));
		System.out.println("Week Number: " + someTime.get(someTime.WEEK_OF_YEAR));
	}

}
