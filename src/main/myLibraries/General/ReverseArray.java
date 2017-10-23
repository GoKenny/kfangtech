package General;

public class ReverseArray {

	public void reverse(int[] arr) {
		
		int[] temp = new int[arr.length];

		for (int i = arr.length - 1, j = 0; i > 0; i--, j++)
			temp[j] = arr[i];

		arr = temp;
	}
}
