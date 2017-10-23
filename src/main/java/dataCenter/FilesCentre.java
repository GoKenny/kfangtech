package dataCenter;


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import toolsBox.Sorters;
import toolsBox.TimeManager;

public class FilesCentre {

	// Data File Specification
	private String folder;
	private String fileName;
	private final String fileSuffix = ".csv";

	private TimeManager timeManager;

	/**
	 * Constructor: Construct The File Name With Current Month and Year-
	 * e.g."Mar.2013"
	 */
	public FilesCentre(int projectID) {

		switch (projectID) {

		// projectID = 1: "Budget Spending"
		case 1:
			this.folder = "D:/Kuinai Data Files/Spending/";
			break;

		// projectID = 2: "Memos"
		case 2:
			this.folder = "D:/Kuinai Data Files/Memos/";
			break;
		}

		timeManager = new TimeManager();
		String currentMonth = timeManager.getCurrentMonth();
		String currentYear = timeManager.getCurrentYear();

		this.fileName = currentMonth + currentYear;
	}

	/** Write To The File Of The Name Of This Month & Year */
	public void addABill(int date, double moneyAmount) throws IOException {

		PrintWriter printWriter = new PrintWriter(new BufferedWriter(new FileWriter(this.folder + this.fileName + this.fileSuffix, true)));

		// When An User Does Not Provide The Date, Make It Default Today
		if (date == 0)
			date = Integer.parseInt(timeManager.getCurrentDate());

		printWriter.write(date + "," + moneyAmount + "\n");

		printWriter.close();
		System.out.println("Data Have Been Saved To: " + this.folder + this.fileName + this.fileSuffix + "\n");

	}

	/** Show The Spending For The Month & Year Inputed */
	public List<String> showSpendingFor(String month, int year) throws IOException {

		String information;
		String date;
		String moneyAmount;
		List<String> toReturn = new ArrayList<String>();

		int transactionCount = 0;
		double totalSpending = 0;

		// decimal format
		DecimalFormat decimalFormat = new DecimalFormat("00");

		File file = new File(this.folder + month + year + this.fileSuffix);
		if (!file.exists()) {
			String errorMessage = "You Don't Have Record For This Month: " + month + year;
			System.err.println(errorMessage);
			toReturn.add(errorMessage);
			return toReturn;
		}

		BufferedReader read = new BufferedReader(new FileReader(file));

		while ((information = read.readLine()) != null) {

			// 1. Extract Information
			date = information.split(",")[0];
			moneyAmount = information.split(",")[1];

			// 2. Count Transaction Number
			transactionCount++;

			// 3. Format The Output And Print It Out
			toReturn.add(decimalFormat.format(transactionCount) + ".  " + decimalFormat.format(Integer.parseInt(date)) + "th   $" + moneyAmount);

			// 4. Calculate The Total Spending For Later Printing
			totalSpending += Double.parseDouble(moneyAmount);
		}

		read.close();
		toReturn.add("Total Spending:\t$" + decimalFormat.format(totalSpending));

		return toReturn;

	}

	public List<String> showSpendingForThisMonth() throws IOException {

		String information;
		String date;
		String moneyAmount;
		List<String> toReturn = new ArrayList<String>();

		int transactionCount = 0;
		double totalSpending = 0;

		// decimal format
		DecimalFormat decimalFormat = new DecimalFormat("00");

		File file = new File(this.folder + this.fileName + this.fileSuffix);
		if (!file.exists()) {
			String errorMessage = "<br>You Don't Have Record For This Month: " + this.fileName;
			System.err.println(errorMessage);
			toReturn.add(errorMessage);
			return toReturn;
		}

		toReturn.add(this.fileName + "<br>");
		BufferedReader read = new BufferedReader(new FileReader(file));

		while ((information = read.readLine()) != null) {

			// 1. Extract Information
			date = information.split(",")[0];
			moneyAmount = information.split(",")[1];

			// 2. Count Transaction Number
			transactionCount++;

			// 3. Format The Output And Print It Out
			toReturn.add(decimalFormat.format(transactionCount) + ".   " + decimalFormat.format(Integer.parseInt(date)) + "th    $" + moneyAmount);

			// 4. Calculate The Total Spending For Later Printing
			totalSpending += Double.parseDouble(moneyAmount);
		}

		read.close();
		toReturn.add("<br>Total Spending:\t$" + decimalFormat.format(totalSpending));

		return toReturn;

	}

	/** Project 2: Append To The File Of The Name Of This Month & Year */
	public void addOneMemoEntry(String entry) throws IOException {

		PrintWriter printWriter = new PrintWriter(new BufferedWriter(new FileWriter(this.folder + this.fileName + this.fileSuffix, true)));
		printWriter.write(entry + "\n");

		printWriter.close();
		System.out.println("Data Have Been Saved To: " + this.folder + this.fileName + this.fileSuffix + "\n");
	}

	public List<String> showCurrentEntries() throws IOException {

		List<String> entries = new ArrayList<String>();

		File file = new File(this.folder + this.fileName + this.fileSuffix);
		if (!file.exists()) {
			String errorMessage = "You Don't Have Record For This Month: " + this.fileName;
			System.err.println(errorMessage);
			entries.add(errorMessage);
			return entries;
		}

		BufferedReader read = new BufferedReader(new FileReader(file));

		String information;
		while ((information = read.readLine()) != null)
			entries.add(information);

		// Sort It
		Sorters sorters = new Sorters();
		sorters.insertSortEntries(entries);

		// Overwrite The Sorted Entries Back To Memo
		PrintWriter printWriter = new PrintWriter(new BufferedWriter(new FileWriter(file)));
		for (int i = 0; i < entries.size(); i++)
			printWriter.write(entries.get(i) + "\n");
		printWriter.close();

		read.close();
		return entries;
	}

	public void commpleteOneEntry(String entryNumber) throws IOException {

		int index = 0;
		String newEntry = "";
		List<String> entries = new ArrayList<String>();

		// 1. Get All Entries From File
		File file = new File(this.folder + this.fileName + this.fileSuffix);
		BufferedReader read = new BufferedReader(new FileReader(file));
		String information;
		while ((information = read.readLine()) != null)
			entries.add(information);
		read.close();

		// 2. Look For The Earliest Pending
		if (entryNumber.equals("")) {
			for (int i = 0; i < entries.size(); i++)
				if (entries.get(i).split(",")[5].equals("Pending")) {
					index = i;
					break;
				}
		} else
			index = Integer.parseInt(entryNumber) - 1;

		// 3. Update The Last Value To "Completed"
		String info[] = entries.get(index).split(",");
		for (int i = 0; i < info.length - 1; i++)
			newEntry += info[i] + ",";
		newEntry += "Completed";
		entries.set(index, newEntry);

		// 3. Write Back To File
		PrintWriter printWriter = new PrintWriter(new BufferedWriter(new FileWriter(this.folder + this.fileName + this.fileSuffix)));
		for (int i = 0; i < entries.size(); i++)
			printWriter.write(entries.get(i) + "\n");
		printWriter.close();
	}

}
