package General;

public class ArrayApp {

	public static void main(String[] args) {
		int value;
		
		int appID[] = new int[20];
		
		for (int i = 0; i < 20; i++) {
			appID[i]=i;
		}
		
		for (int i = 0; i < appID.length; i++) {
			System.out.println(appID[i]);
		}

		// array
		int[][] table = new int[12][50];
		value = table[3][6];
		System.out.println(value);

		/** enlarge the length */
		/*
		 * Item[] temp = new Item[cart.length+3]; 
		 * For (int i = 0; i <cart.length; i++)
		 *    temp[i] = cart[i]; 
		 * cart = temp;
		 */

		// Positions of an Array
		for(int row=0;row<table.length;row++)
		  for(int col=0;col<table[row].length;col++)
		     table[row][col]=row*10+col;
		
		/**Array for class*/		
		/*public class Bank{
            private Account[] accounts=new Accounts[5];}*/
		
		/**print an array*/
		/*
		 * String information="\n";
		 *    
		 *    for(int i=0;i<count;i++)
		 *        information+=accounts[i]+"\n";
		 * */
		
	}

}
