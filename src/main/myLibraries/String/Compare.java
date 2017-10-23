package String;

public class Compare {
	
	public static void main(String[] args) {
		
		String a="Apple";
		String b="BlackBerry";
		
		//>
		if(a.compareTo(b)>0)
			System.out.println("yes");
		else
			System.out.println("no");
		
		//=
		if(a.equals(b))
			System.out.println("equal");
		else
			System.out.println("not equal");
		
	}

}
