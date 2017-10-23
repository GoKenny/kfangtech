package Spring;

import java.util.List;

public class TeamA implements BasketballTeam {

	// 1. Make The LIst
	private List<People> players;

	// 2. Make The Setter For Spring Injection
	public void setPlayers(List<People> players) {
		
		this.players = players;
		
	}

	public void say() {

		System.out.println("\nMembers of Team A:");
		players.get(0).saySomething();
		players.get(1).saySomething();

	}

}
