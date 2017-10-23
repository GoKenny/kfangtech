package toolsBox;

public class StringTransformer {

	public String toNumber(String month) {

		if (month.equals("Jun"))
			return month = "6";

		if (month.equals("Jul"))
			return month = "7";

		if (month.equals("Sep"))
			return month = "9";
		
		if (month.equals("Aug"))
			return month = "8";

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

	public String toWord(String month) {
		
		// to avoid the String like "01"
		int integerMonth = Integer.parseInt(month);
		
		if (integerMonth==1)
			return "January";
		
		if (integerMonth==2)
			return "Feburary";
		
		if (integerMonth==3)
			return "March";
		
		if (integerMonth==4)
			return "April";
		
		if (integerMonth==5)
			return "May";
		
		if (integerMonth==6)
			return "Jun";
		
		if (integerMonth==7)
			return "July";
		
		if (integerMonth==8)
			return "August";
		
		if (integerMonth==9)
			return "September";
		
		if (integerMonth==10)
			return "October";
		
		if (integerMonth==11)
			return "November";
		
		if (integerMonth==12)
			return "December";
		
		return month;
	}

	public String formatDay(String day) {

		if (day.equals("Mon"))
			return "Monday";

		if (day.equals("Tue"))
			return "Tuesday";

		if (day.equals("Wed"))
			return "Wednesday";

		if (day.equals("Thu"))
			return "Thursday";

		if (day.equals("Fri"))
			return "Friday";

		if (day.equals("Sat"))
			return "Saturday";

		if (day.equals("Sun"))
			return "Sunday";

		return "Nothing";

	}

	public String clean(String string) {
		string = string.replace("'", "''");
		return string;
	}

}
