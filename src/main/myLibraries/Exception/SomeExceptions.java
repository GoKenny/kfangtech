package Exception;

public class SomeExceptions {

	public void factorial(int n) throws IllegalArgumentException {
		if (n < 0)
			throw new IllegalArgumentException("You should input a positive number");
		if (n > 16)
			throw new IllegalArgumentException("the number should be smaller than 17");

	}
}
