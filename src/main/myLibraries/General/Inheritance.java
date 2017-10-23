package General;

public class Inheritance {

	/**
	 * 
	 * protected can be inherited, private cannot
	 * 
	 * 1. From parent get new child 
	 *       Book b=new Dictionary();
	 * 
	 * 2. When variables are the same 
	 *       super.x; super.y
	 * 
	 * 3. Constructor for parent 
	 *       super(numb);
	 *  
	 * public class Magazines extends Book { 
	 *   
	 *     protected String about; 
	 *   
	 *     public Magazines(){ 
	 *         about="Sprots"; }
	 *         
	 *     public Magazines(String name,String about) //overload the Magazines                                        
	 *         super();         
	 *         super(name);                           // should be more than parent
	 *         this.about=about; 
	 *         info+="\nName:"+Name+ "\n about: "+about; 
	 *     } 
	 *  }
	 * 
	 * */

}
