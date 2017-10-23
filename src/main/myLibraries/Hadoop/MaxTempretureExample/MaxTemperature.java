package Hadoop.MaxTempretureExample;

import java.io.IOException;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapred.FileInputFormat;
import org.apache.hadoop.mapred.FileOutputFormat;
import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapred.JobConf;

public class MaxTemperature {

	public static void main(String[] args) throws IOException {
		
		JobConf conf = new JobConf(MaxTemperature.class);
		conf.setJobName("Max temperature");

		// 1. Set Output Type
		conf.setOutputKeyClass(Text.class);
		conf.setOutputValueClass(IntWritable.class);

		// 2. Set Your Mapper And Reducer
		conf.setMapperClass(Map.class);
		conf.setReducerClass(Reduce.class);

		// 3. Get Path of Input,Output folder, from the command line
		FileInputFormat.addInputPath(conf, new Path(args[0]));
		FileOutputFormat.setOutputPath(conf, new Path(args[1]));

		JobClient.runJob(conf);

	}

}
