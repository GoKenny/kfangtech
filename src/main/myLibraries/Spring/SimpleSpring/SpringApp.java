package Spring.SimpleSpring;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class SpringApp {
	
	public static void main(String[] args) {
		
		// 1. Load The Configuration XML
		ApplicationContext applicationContext = new ClassPathXmlApplicationContext("SpringAndHibernate/beans.xml");

		// 2. Inject The Values To The Class And Instantiate To People Interface
		People thePeople = (People) applicationContext.getBean("thePeople");
		thePeople.printNameAndAge();
	}

}
