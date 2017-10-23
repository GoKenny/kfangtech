package Hadoop.WordCountExample;

// 1. hadoop-common-2.3.0.jar
// 2. hadoop-core-1.2.1.jar

import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.FileInputFormat;
import org.apache.hadoop.mapred.FileOutputFormat;
import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapred.TextInputFormat;
import org.apache.hadoop.mapred.TextOutputFormat;

/*	
 * Supposed 
 * 		1. Nodes have been setup
 * 		2. Clusters have been setup
 * 
 * and 2 files in the folder of "/something/input":
 * 		File 01, File 02 
 * 
 * and the output folder of "/something/output" should not exist yet:
 * 		http://answers.oreilly.com/topic/455-get-started-analyzing-data-with-hadoop/ 
 */

public class WordCount {

	public static void main(String[] args) throws Exception {
		
		JobConf conf = new JobConf(WordCount.class);
		conf.setJobName("wordcount");


		// 2. Set your Mapper and Reducer for this job
		conf.setMapperClass(Map.class);
		conf.setCombinerClass(Reduce.class);
		conf.setReducerClass(Reduce.class);

		// 3. Set Input and Output Format
		conf.setInputFormat(TextInputFormat.class);
		conf.setOutputFormat(TextOutputFormat.class);
		// 1. Set output type
		conf.setOutputKeyClass(Text.class);
		conf.setOutputValueClass(Text.class);

		// 4. Get Path of Input,Output folder, from the command line
		FileInputFormat.setInputPaths(conf, new Path(args[0]));
		FileOutputFormat.setOutputPath(conf, new Path(args[1]));

		JobClient.runJob(conf);
	}
}

/* 
 * To Run this Job
 * 		1. Build The them into Jar file
 * 		2. jar /something/wordcount.jar Hadoop.WordCountExample.WordCount /something/input /something/output
 * 
 */
