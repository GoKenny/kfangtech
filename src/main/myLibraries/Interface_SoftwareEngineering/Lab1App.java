package Interface_SoftwareEngineering;

import java.util.Scanner;

public class Lab1App {
	
	public static void main(String[] args) {

		String name;
		int grade;
		int userOption;
		StudentRecord[] student = new StudentRecord[2];
		StudentRecord temp;

		Scanner scan = new Scanner(System.in);

		// Get User Inputs For Student Records: Name & Grade
		int studentNo = 1;
		int i = 0;
		while (i < student.length) {

			// 1. Get Name From Console
			System.out.println("****Please input the name and grade for student "+ studentNo + "****");
			System.out.println("Name: ");
			name = scan.next();
			
			// 2. Get Name From Console
			System.out.println("Grade: ");
			grade = scan.nextInt();

			// 3. Store The Student Record To Array
			temp = new StudentRecord(name, grade);
			student[i] = temp;
			System.out.println("****Student " + studentNo + " has been saved successfully!****/n");

			i++;
			studentNo++;
			
		}

		// student[0]=new StudentRecord("Kuinai",1);
		// student[1]=new StudentRecord("Lebron",2);
		// student[2]=new StudentRecord("Jordan",2);
		// student[3]=new StudentRecord("Wade",4);
		// student[4]=new StudentRecord("Jeremy",5);

		// 1. Get Sorting Algorithem Method From Console
		System.out.println("Do you want to use? Please type the algorithm number:");
		System.out.println("1.Selection sort");
		System.out.println("2.Bubble sort");
		userOption = scan.nextInt();
		scan.close();

		// 2. Sort The Student Records Array
		Sorter sorter;
		switch (userOption) {

		case 1:
			sorter = new SelectSorter();
			sorter.sort(student);
			break;

		case 2:
			sorter = new BubbleSorter();
			sorter.sort(student);
			break;

		default:
			System.out.println("You have input an invalid algorithm number, program will exit and please rerun again");
			System.exit(0);

		}

		// Print Out The Results
		for (int j = 0; j < student.length; j++) {
			System.out.println(student[j]);
		}

	}
}
