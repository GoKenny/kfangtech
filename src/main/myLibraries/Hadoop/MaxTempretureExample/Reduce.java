package Hadoop.MaxTempretureExample;

import java.io.IOException;
import java.util.Iterator;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reducer;
import org.apache.hadoop.mapred.Reporter;


/* Mapper output is like:
 *	
 *		(1950, 0)
		(1950, 22)
		(1950, −11)
		(1949, 111)
		(1949, 78)
	
	But after shuffling, it's like:
		(1949, [111, 78])
		(1950, [0, 22, −11])
 */


public class Reduce extends MapReduceBase implements Reducer<Text, IntWritable, Text, IntWritable> {

	public void reduce(Text key, Iterator<IntWritable> values, OutputCollector<Text, IntWritable> output, Reporter reporter) throws IOException {

		// 1. So For each key, get the max value
		int maxValue = Integer.MIN_VALUE;
		while (values.hasNext()) 
			maxValue = Math.max(maxValue, values.next().get());
		
		// 2. Out This key and value 
		output.collect(key, new IntWritable(maxValue));
	}

}


/*
 * 	(1949, 111)
	(1950, 22)
 * 
 */
