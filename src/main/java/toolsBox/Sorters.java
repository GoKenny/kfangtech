package toolsBox;

import java.util.List;

public class Sorters {

	// From Small To Large
	public void insertSortEntries(List<String> list) {

		for (int index = 1; index < list.size(); index++) {

			int position = index;
			String temp = list.get(index);
			int currentDate = Integer.parseInt(temp.split(",")[0]);

			// 1. Replace All Smaller Values to the right
			while (position > 0) {

				int smallerDate = Integer.parseInt(list.get(position - 1).split(",")[0]);

				// 01. Compare Date
				if (currentDate < smallerDate)
					list.set(position, list.get(position - 1));
				// 02. Compare Time
				else if (currentDate == smallerDate) {

					String currentTimeString = list.get(index).split(",")[1];
					if (currentTimeString.equals(""))
						currentTimeString = "0";
					
					String nextTimeString = list.get(position - 1).split(",")[1];
					if (nextTimeString.equals(""))
						nextTimeString="0";
					 
					double currentTime = Double.parseDouble(currentTimeString);
					double nextTime = Double.parseDouble(nextTimeString);
												
					if (currentTime < nextTime)
						list.set(position, list.get(position - 1));
					else
						break;
				} else
					break;

				position--;
			}

			// 2. Insert This Value Before It's Larger One
			list.set(position, temp);
		}

	}
}
