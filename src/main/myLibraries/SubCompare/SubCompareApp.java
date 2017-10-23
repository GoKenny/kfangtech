package SubCompare;

public class SubCompareApp {

	public static void main(String[] args) {

		SalesPerson kuinai = new SalesPerson("Kuinai", 30);
		SalesPerson james = new SalesPerson("James", 20);

		if (kuinai.compareTo(james) > 0)
			System.out.println("yes");
		else
			System.out.println("no");

	}

}
