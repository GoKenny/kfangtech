package General;

import java.util.Scanner;

/**
 * try{  
 *   ...
 * } catch(exception e){
 *   ...
 *  }
 *  
 *  
 *  1. Could only use try{} once,
 *                  1 try{} can only catch 1 exception
 *  
 *  2. When read files,must throws IOException 
 *  
 *  3.System.exit(0);
 *    System.exit(-1); 
 *    
 *  4.self define
 *       Public class myException extends ArithmeticException{
 *          
 *             public myException(){
 *                 super(“Can’t Divide by 0”);
 *             }
 *       }
 *  
 */

public class Exception {
	
	private String keepGoing;
	Scanner scan= new Scanner(System.in);
	
	/**   
	 * thows outside method
	 * thow inside, will stop the method
	 * */
	public int factorial(int n) throws IllegalArgumentException {    
		if(n<0) throw new IllegalArgumentException("You should input a positive number"); 
		if(n>16) throw new IllegalArgumentException("the number should be smaller than 17");		
	
	while (keepGoing.equals("y") || keepGoing.equals("Y")){   

				try {
				    System.out.print("Enter an integer: ");
			        int val = scan.nextInt();   // If exceptin occurs here, loop front
			        
			        System.out.println("Factorial(" + val + ") = ");
			        System.out.print("Another factorial? (y/n) ");
			        keepGoing = scan.next();
			    } 
				catch (IllegalArgumentException e){  
				    System.out.print(e+"\n");
			    }
	}
	
	return n;}

}
