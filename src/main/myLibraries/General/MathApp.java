package General;

public class MathApp {

	public static void main(String[] args) {

		int numb;

		//Math mathod
		numb = 5 % 2;
		System.out.println("Math.min(numb, 2)=" + Math.min(numb, 2));
		System.out.println(Math.min(numb, 2));;
		System.out.println(Math.max(1,12));;
		System.out.println(Math.sqrt(4));;
		System.out.println(Math.pow(5, 6));;

		// random number
		numb = (int) (Math.random() * 100);
		System.out.println(numb);

		// millisecond
		System.out.println(System.currentTimeMillis());;

	}
}
