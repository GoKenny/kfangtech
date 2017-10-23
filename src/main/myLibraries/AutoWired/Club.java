package AutoWired;

import org.springframework.beans.factory.annotation.Autowired;

public class Club {

	@Autowired
	private People p;

	public void whoIsThere() {
		System.out.println(p.getName() + " is in this club");}
}
