package Interface_SoftwareEngineering;

public class SelectSorter implements Sorter {

	public void sort(StudentRecord[] array) {

		for (int i = 0; i < array.length - 1; i++) {
			int maxIndex = 0;
			int j;
			for (j = 1; j < array.length - i; j++)
				if (array[j].getKey() >= array[maxIndex].getKey())
					maxIndex = j;
			StudentRecord temp = array[maxIndex];
			array[maxIndex] = array[j - 1];
			array[j - 1] = temp;
		}
	}
}