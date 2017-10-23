package Interface_SoftwareEngineering;

public class BubbleSorter implements Sorter {

	public void sort(StudentRecord[] array) {

		for (int i = 0; i < array.length; i++)
			for (int j = 0; j < array.length - 1; j++)
				if (array[j].getKey() > array[j + 1].getKey()) {
					StudentRecord temp = array[j];
					array[j] = array[j + 1];
					array[j + 1] = temp;
				}
	}
}