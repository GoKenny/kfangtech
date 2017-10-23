package Hadoop.MaxTempretureExample;

// TODO:  install Hadoop in standalone http://answers.oreilly.com/topic/455-get-started-analyzing-data-with-hadoop/

import java.io.IOException;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.Mapper;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reporter;

/*	Instead of using built-in Java types
 * 		Long	-	LongWritable
 * 		String	-	Text  	
 * 		Integer	-	IntWritable 	
 */

public class Map extends MapReduceBase implements Mapper<LongWritable, Text, Text, IntWritable> {

	private static final int MISSING = 9999;
	
	/*	Input file is like this
	 * 	0067011990999991950051507004...9999999N9+00001+99999999999...
		0043011990999991950051512004...9999999N9+00221+99999999999...
		0043011990999991950051518004...9999999N9-00111+99999999999...
		0043012650999991949032412004...0500001N9+01111+99999999999...
		0043012650999991949032418004...0500001N9+00781+99999999999...
	 * 
	 */

	// For each line of the input files
	public void map(LongWritable key, Text value, OutputCollector<Text, IntWritable> output, Reporter reporter) throws IOException {

		String line = value.toString();

		// 1. Get The Values From The Input File
		String year = line.substring(15, 19);
		
		int airTemperature;
		if (line.charAt(87) == '+') {
			airTemperature = Integer.parseInt(line.substring(88, 92));
		} else {
			airTemperature = Integer.parseInt(line.substring(87, 92));
		}

		// 2. Output To the <key,value> pair
		String quality = line.substring(92, 93);
		if (airTemperature != MISSING && quality.matches("[01459]")) {
			output.collect(new Text(year), new IntWritable(airTemperature));
		}
	}
}

/* Mapper output is like:
 *	
 *	(1950, 0)
	(1950, 22)
	(1950, �6�111)
	(1949, 111)
	(1949, 78)
 */
