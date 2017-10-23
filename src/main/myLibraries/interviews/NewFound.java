package interviews;

public class NewFound {

	public static void main(String[] args) {

		NewFound newFound = new NewFound();
		System.out.println(newFound.solution(53, 1953786));
		
		
		int A[] = { -1, 3, -4, 5, 1, -6, 2, 1 };
		System.out.println(newFound.solution(A));
		

	}

	public int solution(int A, int B) {

		String stringA = Integer.toString(A);
		String stringB = Integer.toString(B);

		int digitNumb = stringA.length();

		for (int i = 0; i < stringB.length() - digitNumb; i++) {

			String stringCompare = stringB.substring(i, digitNumb + i);

			if (stringCompare.equals(stringA))
				return i;

		}

		return -1;
	}
	
	
	// Demo Solution
	public int solution(int[] A) {

		for (int i = 0; i < A.length; i++) {

			int leftSum = 0;
			for (int j = 0; j < i; j++)
				leftSum += A[j];

			int rightSum = 0;
			for (int j = i + 1; j < A.length; j++)
				rightSum += A[j];

			if (leftSum == rightSum)
				return i;
		}

		return -1;
	}

	
	/***
	 * 
	 * 
	The grading system is not quite clear. After completing this demo, I have several question:

	1. do I need to input some data in the "Custom test cases" to get grades?
	2. do I get higher score if I finish it faster?
	3. can you show me the grade when I hit "run" and give me immediate feedback on which parts I should improve on?

	Because last time when I took the test, your Website IDE told me I passed. Then later employer said I got 115 out 200. And I was confused. 
	 * /
	 */
}
