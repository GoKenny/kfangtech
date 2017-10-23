package String;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

public class Convert {

	public static void main(String[] args) throws ParseException {

		String theString = "123";
		int theInteger;
		long theLong;
		
		/** String to integer*/
		theInteger = Integer.parseInt(theString);
		System.out.println("theInteger: " + theInteger);
		
		/** Integer To String */
		theString = Integer.toString(theInteger);
		System.out.println("theString: " + theString);

		/** String to Long */
		theLong = Long.parseLong(theString);
		System.out.println("theLong (long): " + theLong);
		
		/** Long to String - Long means Long Integer */
		theString = Long.toString(theLong);
		System.out.println("theString (long): " + theString);

		/** String To 8-bit Byte*/
		String name = "kuinai";
		byte[] bytesName = name.getBytes();
		System.out.println(Arrays.toString(bytesName));

		/** Bytes To String */
		byte byteName[] = { 107, 117, 105, 110, 97, 105 };
		String stringName = new String(byteName);
		System.out.println(stringName);
		
		/** String To Date*/
		DateFormat dateFormat = new SimpleDateFormat("hh.mm");
		Date date1 = (Date) dateFormat.parse("15.30");
		Date date2 = (Date) dateFormat.parse("14.31");
		if (date1.compareTo(date2) > 0)
			System.out.println("Yes");
		else
			System.out.println("No");
		
		/** String to SQL Date */
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
		java.util.Date javaDate;
		java.sql.Date sqlDate;
		
		// 1. convert to java date 
		javaDate = sdf1.parse("2014-05-27");
		
		// 2. covert to sql date
		sqlDate = new java.sql.Date( javaDate.getTime() ); 
		System.out.println("sqlDate: " + sqlDate);

	}

}
