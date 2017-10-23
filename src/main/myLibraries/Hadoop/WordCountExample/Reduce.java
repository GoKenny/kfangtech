package Hadoop.WordCountExample;

import java.io.IOException;
import java.util.Iterator;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reducer;
import org.apache.hadoop.mapred.Reporter;

/* Mapper output as input:
 *	
 *File 01
 *	<Hello, 1>
 *	<World, 1> 
 * 	<Bye, 	1>
 * 	<World, 1>
 * 
 * File 02
 * 	<Hello, 1>
 * 	<Hadoop, 1>
 * 	<Goodbye, 1>
 * 	<Hadoop, 1>
 * 
 *   After shuffling
 * 		(Bye, 1)
 * 		(Goodbye, 1)
 * 		(Hadoop, [1,1])
 * 		(Hello, [1,1])
 * 		(World, [1,1])
 */

public class Reduce extends MapReduceBase implements Reducer<Text, IntWritable, Text, IntWritable> {
	
	// For each key, do this
	public void reduce(Text key, Iterator<IntWritable> values, OutputCollector<Text, IntWritable> output, Reporter reporter) throws IOException {
		
		// 1. Sum It When It Appears
		int sum =0;
		while (values.hasNext()) 
			 sum += values.next().get();
		
		// 2. Store The Results
		output.collect(key, new IntWritable(sum));
		
	}
}


/* Reducer output:
 * 
 * 	Bye	1
 * 	Goodbye	1
 * 	Hadoop	2
 * 	Hello	2
 * 	World	2
 * 
 */

