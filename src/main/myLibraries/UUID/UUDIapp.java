package UUID;

/**
 * http://stackoverflow.com/questions/5082846/java-ee-6-how-to-implement-stay-logged-in-when-user-login-in-to-the-web-appli
 * 
 * http://docs.oracle.com/javase/7/docs/api/java/util/UUID.html
 * 
 * */


import java.util.UUID;

import javax.servlet.http.Cookie;

public class UUDIapp {
	
	public static void main(String[] args) {
		
		String uuid = UUID.randomUUID().toString();
		System.out.println(uuid);
		
		 Cookie cookie = new Cookie("name", "value");
		
	}
	

}
