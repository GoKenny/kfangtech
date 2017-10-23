package Spring;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
// Require "commons-logging" Jar as well

public class SpringApp {

	public static void main(String[] args) {

		// 1. Load The Configuration XML
		ApplicationContext applicationContext = new ClassPathXmlApplicationContext("SpringAndHibernate/beans.xml");

		// 2. Inject The Values To The Class And Instantiate To People Interface
		People people = (People) applicationContext.getBean("kuinai");
		people.saySomething();
		
		// Use BasketballTeam Interface
		BasketballTeam team = (BasketballTeam) applicationContext.getBean("TeamA");
		team.say();

	}
	
}
