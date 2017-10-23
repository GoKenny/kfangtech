package ArrayList;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public class SortIntegerArray {

	public static void main(String[] args) {

		List<Integer> list = new ArrayList<Integer>();

		for (int i = 0; i < 5; i++)
			list.add(new Random().nextInt(100));

		/** Sort it */
		System.out.println("After Sorting: ");
		Collections.sort(list);
		for (int i = 0; i < list.size(); i++)
			System.out.println(list.get(i));

		/** Revert sort */
		System.out.println("\nRevert Sorting:");
		Collections.sort(list, Collections.reverseOrder());
		for (int i = 0; i < list.size(); i++)
			System.out.println(list.get(i));
	}

}
