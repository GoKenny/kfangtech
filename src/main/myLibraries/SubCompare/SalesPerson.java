package SubCompare;

@SuppressWarnings("rawtypes")
public class SalesPerson implements Comparable {

	private String firstName;
	private int totalSales;

	public SalesPerson(String firstName, int totalSales) {
		this.firstName = firstName;
		this.totalSales = totalSales;
	}

	public int compareTo(Object other) {

		// No
		int result = 0;

		// Larger, Yes
		if (this.totalSales > ((SalesPerson) other).getSales())
			result = 1;

		// When They Are Equal, Check Something Else
		if (totalSales == ((SalesPerson) other).getSales())
			if (firstName.compareTo(((SalesPerson) other).getFirstName()) < 0)
				result = 1;

		return result;
	}

	public int getSales() {
		return this.totalSales;
	}

	public String getFirstName() {
		return this.firstName;
	}
}
