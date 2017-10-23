package General;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class Sorting {

	/** Swap The Smallest Data The The Left*/
	public static void selectionSort(Comparable[] list) {
		
		int minIndex;
		Comparable temp; // For all data types

		for (int i = 0; i < list.length - 1; i++) {
			
			// 1. Get The Index of Smallest Value From The Right
			minIndex = i;
			for (int j = i + 1; j < list.length; j++)
				if (list[j].compareTo(list[minIndex]) < 0)
					minIndex = j;
			
			// 2. Swap the values
			temp = list[minIndex];
			list[minIndex] = list[i];
			list[i] = temp;
		}
	}

	/** Compare With Previous One*/
	public static void insertionSort(Comparable[] list) {

		for (int j = 1; j < list.length; j++) {

			Comparable key = list[j];

			int i = j;
			while (i > 0) {

				// 1. If Larger Than Previous One, Swap To The Left
				if (key.compareTo(list[i - 1]) > 0)
					list[i] = list[i - 1];
				else
					break;

				i--;
			}

			// 3. Insert This Value Before It's Larger One
			list[i] = key;
		}
	}

}