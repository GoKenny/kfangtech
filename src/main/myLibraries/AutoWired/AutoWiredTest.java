package AutoWired;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class AutoWiredTest {
	
	public static void main(String[] args) {
		ApplicationContext ctx= new ClassPathXmlApplicationContext("a/AutoWired.xml");
		
		Club c=(Club) ctx.getBean("club");
		c.whoIsThere();	}
}
