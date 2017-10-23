package ArrayList;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SortStringArray {

	public static void main(String[] args) {

		List<String> list = new ArrayList<String>();

		list.add("banana");
		list.add("apple");
		list.add("pear");
		list.add("apple2");
		list.add("111");
		list.add("121");
		list.add("110");

		/** Sort it */
		System.out.println("After Sorting: \n--------------------------");
		Collections.sort(list);
		for (int i = 0; i < list.size(); i++)
			System.out.println(list.get(i));

		/** Revert sort */
		System.out.println("\nRevert Sorting: \n--------------------------");
		Collections.sort(list, Collections.reverseOrder());
		for (int i = 0; i < list.size(); i++)
			System.out.println(list.get(i));
	}

}
