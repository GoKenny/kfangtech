package Hadoop.WordCountExample;

// Mapper: split data into key and value pair <key, value>

import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.MapReduceBase;
import org.apache.hadoop.mapred.Mapper;
import org.apache.hadoop.mapred.OutputCollector;
import org.apache.hadoop.mapred.Reporter;


/* Mapper Input:
 * 
 * File 01: 
 * 		Hello World Bye World 
 * 
 * File 02:
 * 		Hello Hadoop Goodbye Hadoop
 */


public class Map extends MapReduceBase implements Mapper<Text, Text, Text, IntWritable> {
	
	// 1. Define your key and value
	private Text word = new Text();
	private final static IntWritable one = new IntWritable(1);

	public void map(Text key, Text value, OutputCollector<Text, IntWritable> output, Reporter reporter) throws IOException {
		
		// 2. For each line of the files, split the input by space
		String line = value.toString();
		StringTokenizer tokenizer = new StringTokenizer(line);
		
		// 3. Construct key and value pair
		while (tokenizer.hasMoreTokens()) {
			word.set(tokenizer.nextToken());
			output.collect(word,one );
		}
		
	}
}


/* Mapper output is like:
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
 */

